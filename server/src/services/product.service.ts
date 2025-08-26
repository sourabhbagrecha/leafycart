import { ObjectId } from "mongodb";
import { Product, Review } from "../models/product.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";
import { UserService } from "./user.service.js";

const userService = new UserService();
export class ProductService {
  async findAll(options: {
    category?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const {
      category,
      search,
      sort = "createdAt",
      page = 1,
      limit = 10,
    } = options;

    const query: any = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [products, total] = await Promise.all([
      collections.products
        ?.find(query)
        .sort({ [sort]: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      collections.products?.countDocuments(query),
    ]);

    if (!total) {
      throw new AppError(404, "Product not found");
    }

    return {
      products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const product = await collections.products?.findOne({
      _id: new ObjectId(id),
    });
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    return product;
  }

  async create(data: Product) {
    const now = new Date();
    const product: Omit<Product, "_id"> = {
      ...data,
      reviews: [],
      avgRating: 0,
      numReviews: 0,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collections.products?.insertOne(product as any);
    if (!result) {
      throw new AppError(500, "Failed to create product");
    }
    return this.findById(result.insertedId.toString());
  }

  async update(id: string, data: Partial<Product>) {
    const result = await collections.products?.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new AppError(404, "Product not found");
    }

    return result;
  }

  async delete(id: string) {
    const result = await collections.products?.deleteOne({
      _id: new ObjectId(id),
    });
    if (!result || result.deletedCount === 0) {
      throw new AppError(404, "Product not found");
    }
    return { success: true };
  }

  async addReview(
    productId: string,
    userId: string,
    rating: number,
    comment: string
  ) {
    const product = await this.findById(productId);

    const user = await userService.findById(userId);

    if (!user) throw Error("No user found");

    // Check if user already reviewed this product
    const existingReviewIndex = product.reviews.findIndex(
      (review: Review) => review.userId.toString() === userId
    );

    if (existingReviewIndex !== -1) {
      throw new AppError(400, "You have already reviewed this product");
    }

    const now = new Date();
    const newReview: Review = {
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      userName: user.name,
      rating,
      comment,
      createdAt: now,
      updatedAt: now,
    };

    // Calculate new average rating
    const totalRating = product.numReviews * product.avgRating + rating;
    const newNumReviews = product.numReviews + 1;
    const newAvgRating = totalRating / newNumReviews;

    const result = await collections.products?.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $push: { reviews: newReview },
        $set: {
          avgRating: newAvgRating,
          numReviews: newNumReviews,
          updatedAt: now,
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new AppError(404, "Product not found");
    }

    return result;
  }

  async updateReview(
    productId: string,
    reviewId: string,
    userId: string,
    rating?: number,
    comment?: string
  ) {
    const product = await this.findById(productId);

    const reviewIndex = product.reviews.findIndex(
      (review: Review) =>
        review._id?.toString() === reviewId &&
        review.userId.toString() === userId
    );

    if (reviewIndex === -1) {
      throw new AppError(
        404,
        "Review not found or you don't have permission to update this review"
      );
    }

    const now = new Date();
    const updateData: any = { updatedAt: now };

    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;

    // Update the review in the array
    const updateQuery: any = { updatedAt: now };
    for (const [key, value] of Object.entries(updateData)) {
      if (key !== "updatedAt") {
        updateQuery[`reviews.${reviewIndex}.${key}`] = value;
      }
    }
    updateQuery[`reviews.${reviewIndex}.updatedAt`] = now;

    // Recalculate average rating if rating changed
    if (rating !== undefined) {
      const updatedReviews = [...product.reviews];
      updatedReviews[reviewIndex] = { ...updatedReviews[reviewIndex], rating };
      const totalRating = updatedReviews.reduce(
        (sum: number, review: Review) => sum + review.rating,
        0
      );
      const newAvgRating = totalRating / product.numReviews;
      updateQuery.avgRating = newAvgRating;
    }

    const result = await collections.products?.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: updateQuery },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new AppError(404, "Product not found");
    }

    return result;
  }

  async deleteReview(productId: string, reviewId: string, userId: string) {
    const product = await this.findById(productId);

    const reviewIndex = product.reviews.findIndex(
      (review: Review) =>
        review._id?.toString() === reviewId &&
        review.userId.toString() === userId
    );

    if (reviewIndex === -1) {
      throw new AppError(
        404,
        "Review not found or you don't have permission to delete this review"
      );
    }

    // Remove the review and recalculate averages
    const updatedReviews = product.reviews.filter(
      (_, index) => index !== reviewIndex
    );
    const newNumReviews = product.numReviews - 1;
    const newAvgRating =
      newNumReviews > 0
        ? updatedReviews.reduce(
            (sum: number, review: Review) => sum + review.rating,
            0
          ) / newNumReviews
        : 0;

    const result = await collections.products?.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $set: {
          reviews: updatedReviews,
          avgRating: newAvgRating,
          numReviews: newNumReviews,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new AppError(404, "Product not found");
    }

    return result;
  }

  async getProductReviews(productId: string) {
    const product = await this.findById(productId);

    const reviews = product.reviews;

    return {
      reviews,
    };
  }
}
