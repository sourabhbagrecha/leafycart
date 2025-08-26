import { Router, Request, Response, NextFunction } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { orderSchema } from "../schemas/index.js";
import { orderController } from "../controllers/order.controller.js";

const router = Router();

const valOrderCreate = validate(orderSchema.create),
  valOrderUpdate = validate(orderSchema.updateStatus);

router.get("/", auth, orderController.getOrders);
router.get("/:orderId", auth, orderController.getOrdersById);
router.post("/", auth, valOrderCreate, orderController.createOrder);
router.patch("/:id/status", auth, valOrderUpdate, orderController.updateStatus);
router.delete("/:id", auth, orderController.deleteOrder);

export const orderRoutes = router;
