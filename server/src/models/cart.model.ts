import { ObjectId } from "mongodb";

export interface ProductInfo {
  _id: ObjectId;
  name: String;
  price: number;
  image: String;
}

export interface CartItem {
  product: ProductInfo;
  quantity: number;
}

export interface Cart {
  _id?: ObjectId;
  userId: ObjectId | String;
  items: CartItem[];
  updatedAt?: Date | String;
  total: number;
}
