import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";

const productService = new ProductService();
const userService = new UserService();

class ReviewController {
  public async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { rating, comment } = req.body;
      const userId = req!.userId ?? "";
      const user = await userService.findById(userId);
      if (!user) throw Error("User doesn't exist!");
      const product = await productService.addReview(
        req.params.productId,
        userId,
        rating,
        comment
      );
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  public async getReviewsByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reviews = await productService.getProductReviews(
        req.params.productId
      );
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  public async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { rating, comment } = req.body;
      const userId = (req as any).user.id;
      const product = await productService.updateReview(
        req.params.productId,
        req.params.reviewId,
        userId,
        rating,
        comment
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  public async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const product = await productService.deleteReview(
        req.params.productId,
        req.params.reviewId,
        userId
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

export const reviewController = new ReviewController();
