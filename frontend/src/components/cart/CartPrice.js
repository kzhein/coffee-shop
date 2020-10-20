import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import CartContext from '../../context/cart/cartContext';
import './CartPrice.css';

const CartPrice = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { total, products } = useContext(CartContext);

  const history = useHistory();

  const onClick = () => {
    history.push('/delivery-info');
  };

  return (
    <div className='cart-price'>
      <div className='total'>
        <span>Total</span>
        {new Intl.NumberFormat('en-US').format(total)}Ks
      </div>
      {products.length > 0 && (
        <button className='order' disabled={!isAuthenticated} onClick={onClick}>
          {isAuthenticated ? 'Order' : 'Login to order'}
        </button>
      )}
    </div>
  );
};

export default CartPrice;
