import { createContext } from "react";
import type { Dispatch } from "react";
import type { CartItem, Product } from "../types";

export type CartState = {
  items: CartItem[];
  total: number;
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

export type CartContextType = {
  state: CartState;
  dispatch: Dispatch<CartAction>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
