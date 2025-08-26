import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service.js";
import { CartService } from "../services/cart.service.js";

const orderService = new OrderService();
const cartService = new CartService();

export class OrderController {
  public async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.findAll(req.userId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  public async getOrdersById(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.findById(req.params.orderId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  public async createOrder(req: any, res: any, next: any) {
    try {
      const order = await orderService.create({
        ...req.body,
        userId: req.userId,
      });
      await cartService.clearCart(req.userId ?? "");
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.updateStatus(
        req.params.id,
        req.body.status
      );
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  public async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      await orderService.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();
