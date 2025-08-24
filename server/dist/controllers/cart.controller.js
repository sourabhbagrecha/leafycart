import { ObjectId } from "mongodb";
import { CartService } from "../services/cart.service.js";
const cartService = new CartService();
class CartController {
    async getCart(req, res, next) {
        try {
            const cart = await cartService.getCartByUserId(req.userId);
            res.status(200).json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async addItem(req, res, next) {
        try {
            const { product, quantity } = req.body;
            const cart = await cartService.addItem(req.userId, { ...product, _id: new ObjectId(product._id) }, quantity);
            res.status(200).json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async updateItem(req, res, next) {
        try {
            const { productId } = req.params;
            const { quantity } = req.body;
            const cart = await cartService.updateItemQuantity(req.userId, productId, quantity);
            res.json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async removeItem(req, res, next) {
        try {
            const { productId } = req.params;
            const cart = await cartService.removeItem(req.userId, productId);
            res.json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async clearCart(req, res, next) {
        try {
            const result = await cartService.clearCart(req.userId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
export const cartController = new CartController();
