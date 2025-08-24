import { ObjectId } from "mongodb";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  _id?: ObjectId;
  userId: ObjectId | string;
  items: CartItem[];
  updatedAt?: Date | string;
}
