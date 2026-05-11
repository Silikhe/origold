import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Currency } from "@/lib/currency";
import { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
} | null;

type EcommerceState = {
  cart: CartItem[];
  wishlist: Product[];
  user: User;
  currency: Currency;
};

type EcommerceAction =
  | { type: "ADD_TO_CART"; product: Product; quantity?: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_CART_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; product: Product }
  | { type: "REMOVE_FROM_WISHLIST"; productId: string }
  | { type: "SET_USER"; user: User }
  | { type: "SET_CURRENCY"; currency: Currency };

const initialState: EcommerceState = {
  cart: [],
  wishlist: [],
  user: null,
  currency: "KES",
};

function ecommerceReducer(state: EcommerceState, action: EcommerceAction): EcommerceState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.product.slug === action.product.slug);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.slug === action.product.slug
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: action.quantity || 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.slug !== action.productId),
      };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.slug === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "ADD_TO_WISHLIST":
      if (!state.wishlist.find((p) => p.slug === action.product.slug)) {
        return {
          ...state,
          wishlist: [...state.wishlist, action.product],
        };
      }
      return state;
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((p) => p.slug !== action.productId),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.currency,
      };
    default:
      return state;
  }
}

const EcommerceContext = createContext<{
  state: EcommerceState;
  dispatch: React.Dispatch<EcommerceAction>;
} | null>(null);

export function EcommerceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>{children}</EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error("useEcommerce must be used within an EcommerceProvider");
  }
  return context;
}
