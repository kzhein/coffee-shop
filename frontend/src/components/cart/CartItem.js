import React, { useContext } from 'react';
import CartContext from '../../context/cart/cartContext';
import './CartItem.css';

const CartItem = ({ product }) => {
  const { deleteFromCart, updateCart } = useContext(CartContext);

  const onChange = e => {
    updateCart(product._id, e.target.value * 1);
  };

  return (
    <div className='cart-item'>
      <img src={`/img/products/${product.image}`} alt='' />
      <div className='cart-item-details'>{product.name}</div>
      <div className='cart-item-price'>
        <span>{new Intl.NumberFormat('en-US').format(product.price)}Ks</span>
        <label htmlFor='count'>Qty: </label>
        <select
          value={product.quantity}
          onChange={onChange}
          name='quantity'
          id='quantity'
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
        <button onClick={() => deleteFromCart(product._id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
