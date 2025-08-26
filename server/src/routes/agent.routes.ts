import { ChatOpenAI } from "@langchain/openai";
import { Router } from "express";

const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});

async function generateResponse(request: string) {
  try {
    const prompt = `You are a helpful assistant and e-commerce support executive, as per the user query: "${request}", respond with a professional response.`;
    console.log("Generating response...", prompt);
    const response = await llm.invoke(prompt);
    console.log({ response });
    return response;
  } catch (error) {
    console.error(error);
  }
}

const router = Router();

router.post("/chat", async (req, res) => {
  const response = await generateResponse(req.body.query);
  res.json({ response });
});

export const agentRoutes = router;
