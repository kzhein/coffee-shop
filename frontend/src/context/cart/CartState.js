import React, { useReducer } from 'react';
import CartContext from './cartContext';
import cartReducer from './cartReducer';
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART,
} from '../types';

const CartState = props => {
  const initialState = JSON.parse(localStorage.getItem('cart')) || {
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add to cart
  const addToCart = product => {
    dispatch({ type: ADD_TO_CART, payload: { ...product, quantity: 1 } });
  };

  // Delete from cart
  const deleteFromCart = productId => {
    dispatch({ type: DELETE_FROM_CART, payload: productId });
  };

  // Update cart
  const updateCart = (product, quantity) => {
    dispatch({ type: UPDATE_CART, payload: { product, quantity } });
  };

  // Clear Cart
  const clearCart = () => dispatch({ type: CLEAR_CART });

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        total: state.total,
        addToCart,
        deleteFromCart,
        updateCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
