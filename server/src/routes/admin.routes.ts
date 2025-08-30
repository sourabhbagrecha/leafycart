import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { productSchema } from "../schemas/index.js";
import { productController } from "../controllers/product.controller.js";

const router = Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;

// Admin routes for products - all require authentication
router.post("/products", auth, validate(productSchema.create), createProduct);
router.patch("/products/:productId", auth, validate(productSchema.update), updateProduct);
router.delete("/products/:productId", auth, deleteProduct);

export const adminRoutes = router;