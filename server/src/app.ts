import { config as dotenvConfig } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { callAgent } from "./agents/agent.js";
import { auth } from "./middlewares/auth.middleware.js";
import { ConversationService } from "./services/conversation.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenvConfig();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const routes = await import("./routes/index.js");

// Start server
const startServer = async () => {
  try {
    // Initialize database first
    const client = await connectToDatabase(process.env.MONGODB_URI);

    // Import routes and middleware after database initialization
    const { errorHandler } = await import("./middlewares/error.middleware.js");

    // Route
    app.use("/api/user", routes.userRoutes);
    app.use("/health", routes.healthRoutes);
    app.use("/api/product", routes.productRoutes);
    app.use("/api/review", routes.reviewRoutes);
    app.use("/api/order", routes.orderRoutes);
    app.use("/api/cart", routes.cartRoutes);
    app.use("/api/admin", routes.adminRoutes);
    app.use("/api/conversations", routes.conversationRoutes);
    // Error handling
    app.use(errorHandler);

    app.post("/api/agent", auth, async (req: Request, res: Response) => {
      const initialMessage = req.body?.message ?? "";
      const threadId = Date.now().toString(); // Simple thread ID generation
      const conversationService = new ConversationService();

      try {
        // Call the agent
        const response = await callAgent(
          client,
          initialMessage,
          threadId,
          req.userId
        );

        // Create conversation record
        await conversationService.createConversation(
          req.userId!,
          threadId,
          initialMessage
        );

        // Add both user and assistant messages
        await conversationService.addMessage(threadId, req.userId!, {
          id: Date.now().toString(),
          content: initialMessage,
          role: "user",
          timestamp: new Date(),
        });

        // Handle structured responses
        const responseContent = typeof response === "string" 
          ? response 
          : response.message || JSON.stringify(response);

        await conversationService.addMessage(threadId, req.userId!, {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          role: "assistant",
          timestamp: new Date(),
        });

        // Send structured response to client
        res.json({ 
          threadId, 
          response: typeof response === "string" ? response : response
        });
      } catch (error) {
        console.error("Error starting conversation:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post(
      "/api/agent/:threadId",
      auth,
      async (req: Request, res: Response) => {
        const { threadId } = req.params;
        const { message } = req.body;
        const conversationService = new ConversationService();

        try {
          // Call the agent
          const response = await callAgent(
            client,
            message,
            threadId,
            req.userId
          );

          // Add both user and assistant messages to conversation history
          await conversationService.addMessage(threadId, req.userId!, {
            id: Date.now().toString(),
            content: message,
            role: "user",
            timestamp: new Date(),
          });

          // Handle structured responses
          const responseContent = typeof response === "string" 
            ? response 
            : response.message || JSON.stringify(response);

          await conversationService.addMessage(threadId, req.userId!, {
            id: (Date.now() + 1).toString(),
            content: responseContent,
            role: "assistant",
            timestamp: new Date(),
          });

          // Send structured response to client
          res.json({ 
            response: typeof response === "string" ? response : response
          });
        } catch (error) {
          console.error("Error in chat:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    );

    // Serve static files from React (Vite build)
    app.use(express.static(path.join(__dirname, "public")));

    // Catch-all route (for SPA routing)
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
