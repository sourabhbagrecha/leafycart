import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { ProductService } from "../services/product.service.js";
import { productSchema } from "../schemas/index.js";
import { UserService } from "../services/user.service.js";

const router = Router();
const productService = new ProductService();
const userService = new UserService();

// Get all products with filtering
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, sort, page, limit } = req.query;
    const products = await productService.findAll({
      category: category as string,
      search: search as string,
      sort: sort as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Get single product
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.findById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Create product (admin only)
router.post(
  "/",
  auth,
  validate(productSchema.create),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Update product (admin only)
router.patch(
  "/:id",
  auth,
  validate(productSchema.update),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Delete product (admin only)
router.delete(
  "/:id",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productService.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

// Add review to product
router.post(
  "/:id/reviews",
  auth,
  validate(productSchema.addReview),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rating, comment } = req.body;
      const userId = req!.userId ?? "";
      const user = await userService.findById(userId);
      if (!user) throw Error("User doesn't exist!");
      const userName = user.name;
      const product = await productService.addReview(
        req.params.id,
        userId,
        rating,
        comment
      );
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Get reviews for a product
router.get(
  "/:id/reviews",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query;
      const reviews = await productService.getProductReviews(
        req.params.id,
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined
      );
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

// Update review
router.patch(
  "/:id/reviews/:reviewId",
  auth,
  validate(productSchema.updateReview),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rating, comment } = req.body;
      const userId = (req as any).user.id;
      const product = await productService.updateReview(
        req.params.id,
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
);

// Delete review
router.delete(
  "/:id/reviews/:reviewId",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const product = await productService.deleteReview(
        req.params.id,
        req.params.reviewId,
        userId
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

export const productRoutes = router;
