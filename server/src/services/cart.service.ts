import { Cart, CartItem } from "../models/cart.model.js";
import { collections } from "../config/db.js";
import { Product } from "../models/product.model.js";
import { ObjectId } from "mongodb";
import { AppError } from "../middlewares/error.middleware.js";

export class CartService {
  async getCartByUserId(userId: string) {
    const cart = await collections.carts!.findOne({
      userId: new ObjectId(userId),
    });
    if (!cart) {
      // return empty cart shape
      return { userId: "", items: [], total: 0 } as Cart;
    }
    return cart;
  }

  async updateCartById(cartId: ObjectId, updates: Partial<Cart>) {
    const total = updates.items?.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    return await collections.carts!.updateOne(
      { _id: cartId },
      { $set: { ...updates, updatedAt: new Date(), total } }
    );
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
        total: 0,
      };
      const result = await collections.carts!.insertOne(newCart as any);
      if (!result || !result.insertedId) {
        throw new AppError(500, "Failed to create cart");
      }
      cart = await collections.carts!.findOne({ _id: result.insertedId });
    }
    return cart;
  }

  async addItem(userId: string, product: Product, quantity: number) {
    const cart = await this.createOrGetCart(userId);
    const pId = new ObjectId(product._id);
    const existing = cart!.items.find((i: CartItem) =>
      pId.equals(i.product._id)
    );
    if (existing) existing.quantity += quantity;
    else cart!.items.push({ product, quantity } as any);
    cart!.updatedAt = new Date();
    const result = await this.updateCartById(cart!._id, { items: cart!.items });
    return result;
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number
  ) {
    const cart = await this.createOrGetCart(userId);
    const pId = new ObjectId(productId);
    const item = cart!.items.find((i: CartItem) => pId.equals(i.product._id));
    if (!item) {
      throw new AppError(404, "Item not found in cart");
    }
    item.quantity = quantity;
    cart!.updatedAt = new Date();
    const result = await this.updateCartById(cart!._id, { items: cart!.items });
    return result;
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.createOrGetCart(userId);
    const pId = new ObjectId(productId);
    cart!.items = cart!.items.filter(
      (i: CartItem) => !pId.equals(i.product._id)
    );
    cart!.updatedAt = new Date();
    const result = await this.updateCartById(cart!._id, { items: cart!.items });
    return result;
  }

  async clearCart(userId: string) {
    const cart = await this.createOrGetCart(userId);
    const result = await this.updateCartById(cart!._id, { items: [] });
    return result;
  }
}
