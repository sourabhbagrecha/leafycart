import { ObjectId } from "mongodb";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";
export class OrderService {
    get ordersCollection() {
        if (!collections.orders) {
            throw new AppError(500, "Database not initialized");
        }
        return collections.orders;
    }
    async findAll(userId) {
        const query = userId ? { userId: new ObjectId(userId) } : {};
        return this.ordersCollection.find(query).sort({ createdAt: -1 }).toArray();
    }
    async findById(id) {
        const order = await this.ordersCollection.findOne({
            _id: new ObjectId(id),
        });
        if (!order) {
            throw new AppError(404, "Order not found");
        }
        return order;
    }
    async create(data) {
        const now = new Date();
        const order = {
            ...data,
            status: "pending",
            paymentStatus: "pending",
            createdAt: now,
            updatedAt: now,
        };
        const result = await this.ordersCollection.insertOne(order);
        if (!result || !result.insertedId) {
            throw new AppError(500, "Failed to create order");
        }
        return this.findById(result.insertedId.toString());
    }
    async updateStatus(id, status) {
        const result = await this.ordersCollection.findOneAndUpdate({ _id: new ObjectId(id) }, {
            $set: {
                status,
                updatedAt: new Date(),
            },
        }, { returnDocument: "after" });
        // If no document was matched, findOneAndUpdate may return null / unexpected shape
        // Fetch the updated document to keep typing consistent
        try {
            return this.findById(id);
        }
        catch (e) {
            throw new AppError(404, "Order not found");
        }
    }
    async updatePaymentStatus(id, paymentStatus) {
        const result = await this.ordersCollection.findOneAndUpdate({ _id: new ObjectId(id) }, {
            $set: {
                paymentStatus,
                updatedAt: new Date(),
            },
        }, { returnDocument: "after" });
        try {
            return this.findById(id);
        }
        catch (e) {
            throw new AppError(404, "Order not found");
        }
    }
    async delete(id) {
        const result = await this.ordersCollection.deleteOne({
            _id: new ObjectId(id),
        });
        if (!result || result.deletedCount === 0) {
            throw new AppError(404, "Order not found");
        }
        return { success: true };
    }
}
