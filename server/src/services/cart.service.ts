import { ObjectId } from "mongodb";
import { Cart, CartItem } from "../models/cart.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";

export class CartService {
  async getCartByUserId(userId: string) {
    const cart = await collections.carts!.findOne({
      userId: new ObjectId(userId),
    });
    if (!cart) {
      // return empty cart shape
      return { userId, items: [] } as Cart;
    }
    return cart;
  }

  async createOrGetCart(userId: string) {
    let cart = await collections.carts!.findOne({
      userId: new ObjectId(userId),
    });
    if (!cart) {
      const now = new Date();
      const newCart: Omit<Cart, "_id"> = {
        userId: new ObjectId(userId),
        items: [],
        updatedAt: now,
      };
      const result = await collections.carts!.insertOne(newCart as any);
      if (!result || !result.insertedId) {
        throw new AppError(500, "Failed to create cart");
      }
      cart = await collections.carts!.findOne({ _id: result.insertedId });
    }
    return cart;
  }

  async addItem(userId: string, item: { productId: string; quantity: number }) {
    const cart = await this.createOrGetCart(userId);
    const existing = cart!.items.find(
      (i: CartItem) => i.productId === item.productId
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart!.items.push(item as any);
    }
    cart!.updatedAt = new Date();

    const result = await collections.carts!.updateOne(
      { _id: cart!._id },
      { $set: { items: cart!.items, updatedAt: cart!.updatedAt } }
    );

    if (!result) {
      throw new AppError(500, "Failed to update cart");
    }

    return cart;
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number
  ) {
    const cart = await this.createOrGetCart(userId);
    const item = cart!.items.find((i: CartItem) => i.productId === productId);
    if (!item) {
      throw new AppError(404, "Item not found in cart");
    }
    item.quantity = quantity;
    cart!.updatedAt = new Date();

    const result = await collections.carts!.updateOne(
      { _id: cart!._id },
      { $set: { items: cart!.items, updatedAt: cart!.updatedAt } }
    );

    if (!result) {
      throw new AppError(500, "Failed to update cart");
    }

    return cart;
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.createOrGetCart(userId);
    cart!.items = cart!.items.filter(
      (i: CartItem) => i.productId !== productId
    );
    cart!.updatedAt = new Date();

    const result = await collections.carts!.updateOne(
      { _id: cart!._id },
      { $set: { items: cart!.items, updatedAt: cart!.updatedAt } }
    );

    if (!result) {
      throw new AppError(500, "Failed to update cart");
    }

    return cart;
  }

  async clearCart(userId: string) {
    const cart = await this.createOrGetCart(userId);
    const result = await collections.carts!.updateOne(
      { _id: cart!._id },
      { $set: { items: [], updatedAt: new Date() } }
    );
    if (!result) {
      throw new AppError(500, "Failed to clear cart");
    }
    return { success: true };
  }
}
