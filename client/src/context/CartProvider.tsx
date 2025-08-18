import { useReducer } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./cartContext";
import type { CartState, CartAction } from "./cartContext";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total:
            state.total +
            action.payload.product.price * action.payload.quantity,
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
          },
        ],
        total:
          state.total + action.payload.product.price * action.payload.quantity,
      };
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
        total: state.total - itemToRemove.product.price * itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.product.price * quantityDiff,
      };
    }

    case "CLEAR_CART": {
      return {
        items: [],
        total: 0,
      };
    }

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
