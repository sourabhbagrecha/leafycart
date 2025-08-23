import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  ratings: Rating[];
  avgRating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  userId: ObjectId;
  rating: number;
  review: string;
  createdAt: Date;
}
