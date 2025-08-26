import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";

const productService = new ProductService();

class ProductController {
  public async getProducts(req: Request, res: Response, next: NextFunction) {
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
  }

  public async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(req.params.productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
  public async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(
        req.params.productId,
        req.body
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.delete(req.params.productId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
