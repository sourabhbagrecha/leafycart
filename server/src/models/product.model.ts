import { ObjectId } from "mongodb";

export interface Product {
  _id?: ObjectId;
  id: string;
  name: string;
  isAdmin?: boolean;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  stock: number;
  rating: number;
  reviews: number;
}
