import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StateGraph } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";
import { tool } from "@langchain/core/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { z } from "zod";
import "dotenv/config";

export async function callAgent(
  client: MongoClient,
  query: string,
  thread_id: string,
  userId?: string
) {
  // Define the MongoDB database and collection
  const dbName = "LeafyCart";
  const db = client.db(dbName);
  const ordersCollection = db.collection("orders");
  const productsCollection = db.collection("products");

  // Define the graph state
  const GraphState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
      reducer: (x, y) => x.concat(y),
    }),
  });

  // Define the tools for the agent to use
  const getLatestOrderTool = tool(
    async () => {
      console.log("Getting latest order for user:", userId);
      if (!userId) {
        return "Error: User authentication required to fetch orders";
      }

      try {
        const latestOrder = await ordersCollection.findOne(
          { userId: new ObjectId(userId) },
          { sort: { createdAt: -1 } }
        );

        if (!latestOrder) {
          return "No orders found for this user";
        }

        // Get product details for the order items
        const productIds = latestOrder.items.map(
          (item: { productId: number }) => new ObjectId(item.productId)
        );
        const products = await productsCollection
          .find({ _id: { $in: productIds } })
          .toArray();

        const orderWithProductNames = {
          ...latestOrder,
          items: latestOrder.items.map((item: { productId: string }) => {
            const product = products.find(
              (p) => p._id.toString() === item.productId
            );
            return {
              ...item,
              productName: product?.name || "Unknown Product",
            };
          }),
        };

        return JSON.stringify({
          type: "order_display",
          data: {
            orderId: latestOrder._id,
            status: latestOrder.status,
            total: latestOrder.total,
            items: orderWithProductNames.items,
            createdAt: latestOrder.createdAt,
            shippingDetails: latestOrder.shippingDetails,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    {
      name: "get_latest_order",
      description: "Fetches the user's most recent order details",
      schema: z.object({}),
    }
  );

  const getLastOrdersTool = tool(
    async ({ limit = 10 }) => {
      console.log("Getting last", limit, "orders for user:", userId);
      if (!userId) {
        return "Error: User authentication required to fetch orders";
      }

      try {
        const orders = await ordersCollection
          .find(
            { userId: new ObjectId(userId) },
            { sort: { createdAt: -1 }, limit: limit }
          )
          .toArray();

        if (!orders || orders.length === 0) {
          return "No orders found for this user";
        }

        // Get product details for all order items
        const allProductIds = orders.flatMap((order: any) =>
          order.items.map(
            (item: { productId: string }) => new ObjectId(item.productId)
          )
        );
        const products = await productsCollection
          .find({ _id: { $in: allProductIds } })
          .toArray();

        const ordersWithProductNames = orders.map((order: any) => ({
          ...order,
          items: order.items.map((item: { productId: string }) => {
            const product = products.find(
              (p) => p._id.toString() === item.productId
            );
            return {
              ...item,
              productName: product?.name || "Unknown Product",
            };
          }),
        }));

        return JSON.stringify({
          type: "orders_list",
          data: {
            orders: ordersWithProductNames.map((order: any) => ({
              orderId: order._id,
              status: order.status,
              total: order.total,
              items: order.items,
              createdAt: order.createdAt,
              shippingDetails: order.shippingDetails,
            })),
          },
        });
      } catch (error) {
        throw error;
      }
    },
    {
      name: "get_last_orders",
      description: "Fetches the user's last N orders (default 10)",
      schema: z.object({
        limit: z
          .number()
          .optional()
          .default(10)
          .describe("Number of orders to fetch (max 20)"),
      }),
    }
  );

  const cancelOrderTool = tool(
    async ({ orderId, confirmCancel = false }) => {
      console.log("Cancel order tool called for:", orderId);
      if (!userId) {
        return "Error: User authentication required";
      }

      try {
        const order = await ordersCollection.findOne({
          _id: new ObjectId(orderId),
          userId: new ObjectId(userId),
        });

        if (!order) {
          return "Order not found or you don't have permission to cancel this order";
        }

        if (order.status === "cancelled") {
          return "This order is already cancelled";
        }

        if (order.status === "delivered") {
          return "Cannot cancel an order that has already been delivered";
        }

        if (!confirmCancel) {
          return JSON.stringify({
            type: "order_confirmation",
            data: {
              orderId: order._id,
              status: order.status,
              total: order.total,
              itemsCount: order.items.length,
              action: "cancel",
            },
            message: `I found your order (ID: ${orderId}). Status: ${order.status}, Total: $${order.total}, Items: ${order.items.length}. To confirm cancellation, please reply with "yes" or "confirm" or "cancel it".`,
          });
        }

        // Cancel the order
        const result = await ordersCollection.updateOne(
          { _id: new ObjectId(orderId) },
          {
            $set: {
              status: "cancelled",
              updatedAt: new Date(),
            },
          }
        );

        if (result.modifiedCount > 0) {
          return `Order ${orderId} has been successfully cancelled. You will receive a refund within 3-5 business days.`;
        } else {
          return "Failed to cancel the order. Please try again or contact support.";
        }
      } catch (error) {
        throw error;
      }
    },
    {
      name: "cancel_order",
      description:
        "Cancels a specific order for the user. Requires confirmation before cancelling.",
      schema: z.object({
        orderId: z.string().describe("The ID of the order to cancel"),
        confirmCancel: z
          .boolean()
          .default(false)
          .describe("Set to true to confirm the cancellation"),
      }),
    }
  );

  const tools = [getLatestOrderTool, getLastOrdersTool, cancelOrderTool];

  // We can extract the state typing via `GraphState.State`
  const toolNode = new ToolNode<typeof GraphState.State>(tools);

  const model = new ChatOpenAI({
    model: "gpt-5-mini",
    openAIApiKey: process.env.OPENAI_API_KEY,
  }).bindTools(tools);

  // Define the function that determines whether to continue or not
  function shouldContinue(state: typeof GraphState.State) {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage;

    // If the LLM makes a tool call, then we route to the "tools" node
    if (lastMessage.tool_calls?.length) {
      return "tools";
    }
    // Otherwise, we stop (reply to the user)
    return "__end__";
  }

  // Define the function that calls the model
  async function callModel(state: typeof GraphState.State) {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a helpful AI assistant, collaborating with other assistants. 
        Use the provided tools to progress towards answering the question.
        If you are unable to fully answer, that's OK, another assistant with different tools will help where you left off.
        Execute what you can to make progress.
        If you or any of the other assistants have the final answer or deliverable, prefix your response with FINAL ANSWER so the team knows to stop.
        You have access to the following tools: {tool_names}.\n{system_message}\nCurrent time: {time}.`,
      ],
      new MessagesPlaceholder("messages"),
    ]);

    const formattedPrompt = await prompt.formatMessages({
      system_message: `You are LeafyPilot, a helpful e-commerce shopping assistant for LeafyCart. 
      You can help customers with:
      - Checking their recent orders and order status
      - Showing order history (use get_last_orders for multiple orders)
      - Cancelling orders (with proper confirmation process)
      - General shopping assistance and product inquiries
      
      For order queries:
      - Use get_latest_order for "latest", "most recent", or "last order" (singular)
      - Use get_last_orders for "orders", "order history", "past orders", or when they want to see multiple orders
      
      For order cancellation workflow:
      1. When user asks to "cancel my latest order" or similar, use get_latest_order first
      2. Present the order details clearly and ask for confirmation
      3. If user responds with confirmation words like "yes", "confirm", "cancel it", "proceed", etc., 
         then call cancel_order with confirmCancel=true and the orderId
      4. If user says "no", "never-mind", "wait", etc., don't cancel
      
      IMPORTANT: Always extract the orderId from the get_latest_order response and use it in cancel_order.
      
      Be conversational, helpful, and ensure users understand what they're cancelling before proceeding.`,
      time: new Date().toISOString(),
      tool_names: tools.map((tool) => tool.name).join(", "),
      messages: state.messages,
    });

    const result = await model.invoke(formattedPrompt);

    return { messages: [result] };
  }

  // Define a new graph
  const workflow = new StateGraph(GraphState)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");

  // Initialize the MongoDB memory to persist state between graph runs
  const checkpointer = new MongoDBSaver({ client, dbName });

  // This compiles it into a LangChain Runnable.
  // Note that we're passing the memory when compiling the graph
  const app = workflow.compile({ checkpointer });

  // Use the Runnable
  const finalState = await app.invoke(
    {
      messages: [new HumanMessage(query)],
    },
    { recursionLimit: 15, configurable: { thread_id: thread_id } }
  );

  const lastMessage = finalState.messages[finalState.messages.length - 1];
  const responseContent =
    typeof lastMessage.content === "string"
      ? lastMessage.content
      : JSON.stringify(lastMessage.content);

  console.log("Agent response:", responseContent);

  // Only look for structured data from recent tool calls (from this interaction)
  // Get messages from the last human message onwards to avoid old tool results
  let lastHumanMessageIndex = -1;
  for (let i = finalState.messages.length - 1; i >= 0; i--) {
    if (finalState.messages[i].constructor.name === "HumanMessage") {
      lastHumanMessageIndex = i;
      break;
    }
  }

  const recentMessages =
    lastHumanMessageIndex >= 0
      ? finalState.messages.slice(lastHumanMessageIndex)
      : [];
  const recentToolResults = recentMessages
    .filter((msg) => msg.constructor.name === "ToolMessage")
    .map((msg) =>
      typeof msg.content === "string"
        ? msg.content
        : JSON.stringify(msg.content)
    );

  // Look for structured data in recent tool results only
  let structuredData = null;
  for (const result of recentToolResults) {
    try {
      const parsed = JSON.parse(result);
      if (parsed.type && parsed.data) {
        structuredData = parsed;
        break;
      }
    } catch (e) {
      // Not JSON or not structured data, continue
    }
  }

  // Return structured response if found, otherwise return text
  if (structuredData) {
    return {
      type: structuredData.type,
      data: structuredData.data,
      message: structuredData.message || responseContent,
    };
  }

  return {
    type: "text",
    message: responseContent,
  };
}
