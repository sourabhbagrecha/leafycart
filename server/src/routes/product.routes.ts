import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { productSchema } from "../schemas/index.js";
import { productController } from "../controllers/product.controller.js";

const router = Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = productController;

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/", auth, validate(productSchema.create), createProduct);
router.patch(
  "/:productId",
  auth,
  validate(productSchema.update),
  updateProduct
);
router.delete("/:productId", auth, deleteProduct);

export const productRoutes = router;
