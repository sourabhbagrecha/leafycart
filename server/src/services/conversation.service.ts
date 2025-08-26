import { ObjectId } from "mongodb";
import { Conversation, ConversationMessage } from "../models/conversation.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";

export class ConversationService {
  async findAllByUser(userId: string) {
    return collections.conversations
      ?.find({ userId: new ObjectId(userId) })
      .sort({ updatedAt: -1 })
      .toArray();
  }

  async findByThreadId(threadId: string, userId: string) {
    const conversation = await collections.conversations?.findOne({
      threadId,
      userId: new ObjectId(userId),
    });
    return conversation;
  }

  async createConversation(userId: string, threadId: string, firstMessage: string) {
    const now = new Date();
    
    // Generate title from first message (first 50 chars)
    const title = firstMessage.length > 50 
      ? firstMessage.substring(0, 50) + "..." 
      : firstMessage;

    const conversation: Omit<Conversation, "_id"> = {
      userId: new ObjectId(userId),
      threadId,
      title,
      messages: [],
      createdAt: now,
      updatedAt: now,
      isActive: true,
    };

    const result = await collections.conversations?.insertOne(conversation as any);
    if (!result || !result.insertedId) {
      throw new AppError(500, "Failed to create conversation");
    }

    return this.findById(result.insertedId.toString());
  }

  async addMessage(threadId: string, userId: string, message: ConversationMessage) {
    const result = await collections.conversations?.findOneAndUpdate(
      { 
        threadId, 
        userId: new ObjectId(userId) 
      },
      {
        $push: { messages: message },
        $set: { 
          updatedAt: new Date(),
          isActive: true 
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new AppError(404, "Conversation not found");
    }

    return result;
  }

  async updateTitle(threadId: string, userId: string, newTitle: string) {
    const result = await collections.conversations?.findOneAndUpdate(
      { 
        threadId, 
        userId: new ObjectId(userId) 
      },
      {
        $set: { 
          title: newTitle,
          updatedAt: new Date() 
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new AppError(404, "Conversation not found");
    }

    return result;
  }

  async findById(id: string) {
    const conversation = await collections.conversations?.findOne({
      _id: new ObjectId(id),
    });
    if (!conversation) {
      throw new AppError(404, "Conversation not found");
    }
    return conversation;
  }

  async deleteConversation(threadId: string, userId: string) {
    const result = await collections.conversations?.deleteOne({
      threadId,
      userId: new ObjectId(userId),
    });
    
    if (!result || result.deletedCount === 0) {
      throw new AppError(404, "Conversation not found");
    }
    
    return { success: true };
  }

  async markInactive(threadId: string, userId: string) {
    const result = await collections.conversations?.updateOne(
      { 
        threadId, 
        userId: new ObjectId(userId) 
      },
      {
        $set: { 
          isActive: false,
          updatedAt: new Date() 
        },
      }
    );

    return result && result.modifiedCount > 0;
  }
}