import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { ProductService } from "../services/product.service.js";
import { productSchema } from "../schemas/index.js";
const router = Router();
const productService = new ProductService();
// Get all products with filtering
router.get("/", async (req, res, next) => {
    try {
        const { category, search, sort, page, limit } = req.query;
        const products = await productService.findAll({
            category: category,
            search: search,
            sort: sort,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined,
        });
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
// Get single product
router.get("/:id", async (req, res, next) => {
    try {
        const product = await productService.findById(req.params.id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
// Create product (admin only)
router.post("/", auth, validate(productSchema.create), async (req, res, next) => {
    try {
        const product = await productService.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
});
// Update product (admin only)
router.patch("/:id", auth, validate(productSchema.update), async (req, res, next) => {
    try {
        const product = await productService.update(req.params.id, req.body);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
// Delete product (admin only)
router.delete("/:id", auth, async (req, res, next) => {
    try {
        await productService.delete(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
// Add rating to product
router.post("/:id/ratings", auth, validate(productSchema.addRating), async (req, res, next) => {
    try {
        const product = await productService.addRating();
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
export const productRoutes = router;
