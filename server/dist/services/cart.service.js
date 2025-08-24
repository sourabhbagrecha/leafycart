import { ObjectId } from "mongodb";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";
export class CartService {
    async getCartByUserId(userId) {
        const cart = await collections.carts.findOne({
            userId: new ObjectId(userId),
        });
        if (!cart) {
            // return empty cart shape
            return { userId, items: [] };
        }
        return cart;
    }
    async createOrGetCart(userId) {
        let cart = await collections.carts.findOne({
            userId: new ObjectId(userId),
        });
        if (!cart) {
            const now = new Date();
            const newCart = {
                userId: new ObjectId(userId),
                items: [],
                updatedAt: now,
            };
            const result = await collections.carts.insertOne(newCart);
            if (!result || !result.insertedId) {
                throw new AppError(500, "Failed to create cart");
            }
            cart = await collections.carts.findOne({ _id: result.insertedId });
        }
        return cart;
    }
    async addItem(userId, item) {
        const cart = await this.createOrGetCart(userId);
        const existing = cart.items.find((i) => i.productId === item.productId);
        if (existing) {
            existing.quantity += item.quantity;
        }
        else {
            cart.items.push(item);
        }
        cart.updatedAt = new Date();
        const result = await collections.carts.updateOne({ _id: cart._id }, { $set: { items: cart.items, updatedAt: cart.updatedAt } });
        if (!result) {
            throw new AppError(500, "Failed to update cart");
        }
        return cart;
    }
    async updateItemQuantity(userId, productId, quantity) {
        const cart = await this.createOrGetCart(userId);
        const item = cart.items.find((i) => i.productId === productId);
        if (!item) {
            throw new AppError(404, "Item not found in cart");
        }
        item.quantity = quantity;
        cart.updatedAt = new Date();
        const result = await collections.carts.updateOne({ _id: cart._id }, { $set: { items: cart.items, updatedAt: cart.updatedAt } });
        if (!result) {
            throw new AppError(500, "Failed to update cart");
        }
        return cart;
    }
    async removeItem(userId, productId) {
        const cart = await this.createOrGetCart(userId);
        cart.items = cart.items.filter((i) => i.productId !== productId);
        cart.updatedAt = new Date();
        const result = await collections.carts.updateOne({ _id: cart._id }, { $set: { items: cart.items, updatedAt: cart.updatedAt } });
        if (!result) {
            throw new AppError(500, "Failed to update cart");
        }
        return cart;
    }
    async clearCart(userId) {
        const cart = await this.createOrGetCart(userId);
        const result = await collections.carts.updateOne({ _id: cart._id }, { $set: { items: [], updatedAt: new Date() } });
        if (!result) {
            throw new AppError(500, "Failed to clear cart");
        }
        return { success: true };
    }
}
