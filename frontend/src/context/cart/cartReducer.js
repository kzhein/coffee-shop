import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART,
} from '../types';

export default (state, action) => {
  let cartData = null;
  let total = null;
  let products = null;

  const calculateTotal = () =>
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  switch (action.type) {
    case ADD_TO_CART:
      products = [...state.products, action.payload];
      total = calculateTotal();
      cartData = { products, total };
      localStorage.setItem('cart', JSON.stringify(cartData));
      return cartData;

    case DELETE_FROM_CART:
      products = state.products.filter(
        product => product._id !== action.payload
      );
      total = calculateTotal();
      cartData = { products, total };
      localStorage.setItem('cart', JSON.stringify(cartData));
      return cartData;
    case UPDATE_CART:
      products = state.products.map(product =>
        product._id === action.payload.product
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
      total = calculateTotal();
      cartData = { products, total };
      localStorage.setItem('cart', JSON.stringify(cartData));
      return cartData;
    case CLEAR_CART:
      localStorage.removeItem('cart');
      return {
        products: [],
        total: 0,
      };
    default:
      return state;
  }
};
