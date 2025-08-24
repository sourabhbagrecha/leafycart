import { CartService } from "../services/cart.service.js";
const cartService = new CartService();
class CartController {
    async getCart(req, res, next) {
        try {
            const cart = await cartService.getCartByUserId(req.user.userId);
            res.json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async addItem(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const cart = await cartService.addItem(req.user.userId, {
                productId,
                quantity,
            });
            res.status(200).json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async updateItem(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const cart = await cartService.updateItemQuantity(req.user.userId, productId, quantity);
            res.json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async removeItem(req, res, next) {
        try {
            const { productId } = req.params;
            const cart = await cartService.removeItem(req.user.userId, productId);
            res.json(cart);
        }
        catch (err) {
            next(err);
        }
    }
    async clearCart(req, res, next) {
        try {
            const result = await cartService.clearCart(req.user.userId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
export const cartController = new CartController();
