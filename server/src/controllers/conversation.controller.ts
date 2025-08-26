import { Request, Response, NextFunction } from "express";
import { ConversationService } from "../services/conversation.service.js";

const conversationService = new ConversationService();

export class ConversationController {
  public async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const conversations = await conversationService.findAllByUser(req.userId!);
      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  }

  public async getConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId } = req.params;
      const conversation = await conversationService.findByThreadId(threadId, req.userId!);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      res.status(200).json(conversation);
    } catch (error) {
      next(error);
    }
  }

  public async updateTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId } = req.params;
      const { title } = req.body;
      
      const conversation = await conversationService.updateTitle(threadId, req.userId!, title);
      res.status(200).json(conversation);
    } catch (error) {
      next(error);
    }
  }

  public async deleteConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId } = req.params;
      await conversationService.deleteConversation(threadId, req.userId!);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const conversationController = new ConversationController();