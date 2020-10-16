import React, { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../../context/cart/cartContext';
import './CartItems.css';

const CartItems = () => {
  const { products } = useContext(CartContext);

  return (
    <div className='cart-items'>
      {products.map(product => (
        <CartItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CartItems;
