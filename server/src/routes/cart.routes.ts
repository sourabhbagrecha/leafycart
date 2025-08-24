import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

const { getCart, addItem, updateItem, removeItem, clearCart } = cartController;

router.get("/", auth, getCart);
router.post("/", auth, addItem);
router.patch("/item/:productId", auth, updateItem);
router.delete("/item/:productId", auth, removeItem);
router.delete("/", auth, clearCart);

export const cartRoutes = router;
