import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";
import { generateEmbedding, createProductText } from "../utils/embedding.util.js";

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

  public async vectorizeProducts(_req: Request, res: Response, next: NextFunction) {
    try {
      const startTime = Date.now();
      
      // Get all products without embeddings
      const unembeddedProducts = await productService.findUnembedded();
      
      if (unembeddedProducts.length === 0) {
        return res.json({
          success: true,
          message: "All products are already vectorized",
          processed: 0,
          total: 0,
          duration: Date.now() - startTime
        });
      }

      let processed = 0;
      let errors: { productId: string; error: string; }[] = [];

      console.log(`Starting vectorization of ${unembeddedProducts.length} products...`);

      // Process products one by one to avoid rate limits
      for (const product of unembeddedProducts) {
        try {
          // Create text representation of the product
          const productText = createProductText({
            name: product.name,
            description: product.description,
            category: product.category
          });

          // Generate embedding
          console.log(`Generating embedding for product: ${product.name}`);
          const embedding = await generateEmbedding(productText);

          // Update product with embedding
          await productService.updateEmbedding(product._id.toString(), embedding);
          
          processed++;
          console.log(`✅ Processed ${processed}/${unembeddedProducts.length}: ${product.name}`);

          // Add a small delay to be respectful to the API
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`❌ Error processing product ${product.name}:`, errorMessage);
          
          errors.push({
            productId: product._id.toString(),
            error: errorMessage
          });
        }
      }

      const duration = Date.now() - startTime;
      
      const response = {
        success: true,
        message: `Vectorization completed. Processed ${processed}/${unembeddedProducts.length} products`,
        processed,
        total: unembeddedProducts.length,
        errors: errors.length > 0 ? errors : undefined,
        duration
      };

      console.log(`Vectorization completed in ${duration}ms. Success: ${processed}, Errors: ${errors.length}`);
      
      res.json(response);

    } catch (error) {
      console.error('Vectorization process failed:', error);
      next(error);
    }
  }

  public async suggestProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { query, limit } = req.body;
      
      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Query is required and must be a non-empty string'
        });
      }

      // Generate embedding for the search query
      console.log(`Generating embedding for query: "${query}"`);
      const queryEmbedding = await generateEmbedding(query.trim());

      // Perform semantic search
      const suggestions = await productService.searchSemantic(
        queryEmbedding, 
        limit ? parseInt(limit as string) : 10
      );

      res.json({
        success: true,
        query: query.trim(),
        suggestions,
        count: suggestions.length
      });

    } catch (error) {
      console.error('Product suggestion failed:', error);
      next(error);
    }
  }
}

export const productController = new ProductController();
