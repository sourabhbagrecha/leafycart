import { Router } from "express";
import { conversationController } from "../controllers/conversation.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

// Get all conversations for the authenticated user
router.get("/", auth, conversationController.getConversations);

// Get a specific conversation by threadId
router.get("/:threadId", auth, conversationController.getConversation);

// Update conversation title
router.patch("/:threadId/title", auth, conversationController.updateTitle);

// Delete a conversation
router.delete("/:threadId", auth, conversationController.deleteConversation);

export default router;