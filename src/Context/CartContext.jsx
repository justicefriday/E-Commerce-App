
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = { cart: [], };

const cartReducer = (state, action) =>  {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.cart.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "CLERA_CART":
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = product => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = id => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const increaseQuantity = id => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = id => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const clearCart = () => {
    dispatch({type:"CLEAR_CART"})
  };
  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
