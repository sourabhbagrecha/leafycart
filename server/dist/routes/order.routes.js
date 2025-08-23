import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { OrderService } from "../services/order.service.js";
import { orderSchema } from "../schemas/index.js";
const router = Router();
const orderService = new OrderService();
// Get all orders (admin gets all, user gets their own)
router.get("/", auth(), async (req, res, next) => {
    try {
        const orders = await orderService.findAll(req.user.role === "admin" ? undefined : req.user.userId);
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
});
// Get single order
router.get("/:id", auth(), async (req, res, next) => {
    try {
        const order = await orderService.findById(req.params.id);
        // Check if user has permission to view this order
        if (req.user.role !== "admin" &&
            order.userId.toString() !== req.user.userId) {
            return res
                .status(403)
                .json({ message: "Not authorized to view this order" });
        }
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
// Create order
router.post("/", auth(), validate(orderSchema.create), async (req, res, next) => {
    try {
        const order = await orderService.create({
            ...req.body,
            userId: req.user.userId,
        });
        res.status(201).json(order);
    }
    catch (error) {
        next(error);
    }
});
// Update order status (admin only)
router.patch("/:id/status", auth(["admin"]), validate(orderSchema.updateStatus), async (req, res, next) => {
    try {
        const order = await orderService.updateStatus(req.params.id, req.body.status);
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
// Update payment status (admin only)
router.patch("/:id/payment", auth(["admin"]), validate(orderSchema.updatePaymentStatus), async (req, res, next) => {
    try {
        const order = await orderService.updatePaymentStatus(req.params.id, req.body.paymentStatus);
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
// Delete order (admin only)
router.delete("/:id", auth(["admin"]), async (req, res, next) => {
    try {
        await orderService.delete(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
export const orderRoutes = router;
