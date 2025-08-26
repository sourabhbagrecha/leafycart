import { ObjectId } from "mongodb";

export interface Review {
  _id?: ObjectId;
  userId: ObjectId;
  userName: string;
  rating: number;
  comment: string;
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
  reviews: Review[];
  avgRating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
