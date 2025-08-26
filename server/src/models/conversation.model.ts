import { ObjectId } from "mongodb";

export interface ConversationMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface Conversation {
  _id?: ObjectId;
  userId: ObjectId | string;
  threadId: string;
  title: string; // Auto-generated from first message or user-set
  messages: ConversationMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; // Whether conversation is still ongoing
}