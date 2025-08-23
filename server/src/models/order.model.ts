import { ObjectId } from "mongodb";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  _id?: ObjectId;
  id?: string;

  // userId may be stored as an ObjectId in MongoDB or as a string in sample/client data
  userId: ObjectId | string;
  items: OrderItem[];
  total: number;
  // Common statuses included as union, allow other strings too
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | string;
  paymentStatus: "pending" | "paid" | "failed" | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  shippingDetails: ShippingDetails;
}
