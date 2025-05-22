"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string; // Changed from title to name
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  isCartOpen: boolean; // Added
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: string; size: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" } // Added
  | { type: "CLOSE_CART" } // Added
  | { type: "TOGGLE_CART" }; // Added

const initialState: CartState = {
  items: [],
  total: 0,
  isCartOpen: false, // Added
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Add new item
        const updatedItems = [...state.items, action.payload];

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size)
      );

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case "CLEAR_CART":
      return { ...initialState, isCartOpen: state.isCartOpen }; // Preserve cart open state

    case "OPEN_CART": // Added
      return { ...state, isCartOpen: true };

    case "CLOSE_CART": // Added
      return { ...state, isCartOpen: false };

    case "TOGGLE_CART": // Added
      return { ...state, isCartOpen: !state.isCartOpen };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
