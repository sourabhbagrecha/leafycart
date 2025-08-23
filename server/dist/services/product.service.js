import { ObjectId } from "mongodb";
import { AppError } from "../middlewares/error.middleware.js";
import { collections } from "../config/db.js";
export class ProductService {
    async findAll(options) {
        const { category, search, sort = "createdAt", page = 1, limit = 10, } = options;
        const query = {};
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
    async findById(id) {
        const product = await collections.products?.findOne({
            _id: new ObjectId(id),
        });
        if (!product) {
            throw new AppError(404, "Product not found");
        }
        return product;
    }
    async create(data) {
        const now = new Date();
        const product = {
            ...data,
            ratings: [],
            avgRating: 0,
            numReviews: 0,
            createdAt: now,
            updatedAt: now,
        };
        const result = await collections.products?.insertOne(product);
        if (!result) {
            throw new AppError(404, "Product not found");
        }
        return this.findById(result.insertedId.toString());
    }
    async update(id, data) {
        const result = await collections.products?.findOneAndUpdate({ _id: new ObjectId(id) }, {
            $set: {
                ...data,
                updatedAt: new Date(),
            },
        }, { returnDocument: "after" });
        if (!result) {
            throw new AppError(404, "Product not found");
        }
        return result;
    }
    async delete(id) {
        const result = await collections.products?.deleteOne({
            _id: new ObjectId(id),
        });
        if (!result || result.deletedCount === 0) {
            throw new AppError(404, "Product not found");
        }
        return { success: true };
    }
    // TBD
    async addRating() { }
}
