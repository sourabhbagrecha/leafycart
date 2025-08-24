import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

const { getCart, addItem, updateItem, removeItem, clearCart } = cartController;

router.get("/", getCart);
router.post("/item", addItem);
router.patch("/item", updateItem);
router.delete("/item/:productId", removeItem);
router.delete("/", clearCart);

export const cartRoutes = router;
