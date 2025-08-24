import { ObjectId } from "mongodb";
import { Order } from "../models/order.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";

export class OrderService {
  async findAll(userId?: string) {
    const query = userId ? { userId: new ObjectId(userId) } : {};
    return collections.orders?.find(query).sort({ createdAt: -1 }).toArray();
  }

  async findById(id: string) {
    const order = await collections.orders?.findOne({
      _id: new ObjectId(id),
    });
    if (!order) {
      throw new AppError(404, "Order not found");
    }
    return order;
  }

  async create(data: Omit<Order, "_id" | "createdAt" | "updatedAt">) {
    const now = new Date();
    const order: Omit<Order, "_id"> = {
      ...data,
      userId: new ObjectId(data.userId),
      status: "pending",
      paymentStatus: "pending",
      createdAt: now,
      updatedAt: now,
    };

    const result = await collections.orders?.insertOne(order as any);
    if (!result || !result.insertedId) {
      throw new AppError(500, "Failed to create order");
    }

    return this.findById(result.insertedId.toString());
  }

  async updateStatus(id: string, status: Order["status"]) {
    const result = await collections.orders?.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    // If no document was matched, findOneAndUpdate may return null / unexpected shape
    // Fetch the updated document to keep typing consistent
    try {
      return this.findById(id);
    } catch (e) {
      throw new AppError(404, "Order not found");
    }
  }

  async updatePaymentStatus(id: string, paymentStatus: Order["paymentStatus"]) {
    const result = await collections.orders?.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          paymentStatus,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    try {
      return this.findById(id);
    } catch (e) {
      throw new AppError(404, "Order not found");
    }
  }

  async delete(id: string) {
    const result = await collections.orders?.deleteOne({
      _id: new ObjectId(id),
    });
    if (!result || result.deletedCount === 0) {
      throw new AppError(404, "Order not found");
    }
    return { success: true };
  }
}
