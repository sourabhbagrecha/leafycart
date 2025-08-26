import { Router, Request, Response, NextFunction } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { productSchema } from "../schemas/index.js";
import { reviewController } from "../controllers/review.controller.js";

const router = Router();

const { addReview, deleteReview, updateReview, getReviewsByProductId } =
  reviewController;

router.post("/:productId", auth, validate(productSchema.addReview), addReview);
router.get("/:productId", getReviewsByProductId);
router.put(
  "/:productId/:reviewId",
  auth,
  validate(productSchema.updateReview),
  updateReview
);
router.delete("/:productId/:reviewId", auth, deleteReview);

export const reviewRoutes = router;
