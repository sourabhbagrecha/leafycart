export interface Product {
  id: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured?: boolean;
  stock: number;
  rating: number;
  reviews: Review[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: Order[];
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartProductInfo {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: CartProductInfo;
  quantity: number;
}

export interface Cart {
  _id?: string;
  userId: string | string;
  items: CartItem[];
  updatedAt?: Date | string;
  total: number;
}

interface PaymentInfo {
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  _id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | string;
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
}
