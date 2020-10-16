import React from 'react';
import './OrderItem.css';

const OrderItem = ({ order }) => {
  return (
    <div className='order-item'>
      <img src={`/img/products/${order.product.image}`} alt='' />
      <div className='order-item-details'>{order.product.name}</div>
      <div className='order-item-price'>
        <span>{order.purchasedPrice}Ks</span>
        Qty: {order.quantity}
      </div>
    </div>
  );
};

export default OrderItem;
