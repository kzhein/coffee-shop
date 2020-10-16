import React, { useContext, useEffect } from 'react';
import CartItems from '../cart/CartItems';
import CartPrice from '../cart/CartPrice';
import CartContext from '../../context/cart/cartContext';
import AuthContext from '../../context/auth/authContext';

import './Cart.css';

const Cart = () => {
  const { products } = useContext(CartContext);
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='cart container'>
      <p>Cart({products.length} items)</p>
      <div className='cart-card'>
        <CartItems />
        <CartPrice />
      </div>
    </div>
  );
};

export default Cart;
