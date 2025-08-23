import { z } from "zod";

export const userSchema = {
  register: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      role: z.enum(["user", "admin"]).optional(),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().min(2).optional(),
      email: z.string().email().optional(),
    }),
  }),

  updatePassword: z.object({
    body: z.object({
      oldPassword: z.string(),
      newPassword: z.string().min(6),
    }),
  }),
};

export const productSchema = {
  create: z.object({
    body: z.object({
      name: z.string().min(2),
      description: z.string().min(10),
      price: z.number().positive(),
      images: z.array(z.string().url()),
      category: z.string(),
      stock: z.number().int().nonnegative(),
    }),
  }),

  update: z.object({
    body: z.object({
      name: z.string().min(2).optional(),
      description: z.string().min(10).optional(),
      price: z.number().positive().optional(),
      images: z.array(z.string().url()).optional(),
      category: z.string().optional(),
      stock: z.number().int().nonnegative().optional(),
    }),
  }),

  addRating: z.object({
    body: z.object({
      rating: z.number().min(1).max(5),
      review: z.string().min(10),
    }),
  }),
};

export const orderSchema = {
  create: z.object({
    body: z.object({
      items: z.array(
        z.object({
          productId: z.string(),
          name: z.string(),
          price: z.number().positive(),
          quantity: z.number().int().positive(),
        })
      ),
      totalAmount: z.number().positive(),
      shippingAddress: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string(),
      }),
    }),
  }),

  updateStatus: z.object({
    body: z.object({
      status: z.enum([
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ]),
    }),
  }),

  updatePaymentStatus: z.object({
    body: z.object({
      paymentStatus: z.enum(["pending", "completed", "failed"]),
    }),
  }),
};
