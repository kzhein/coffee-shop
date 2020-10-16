import React from 'react';
import './OrderStatus.css';

const OrderStatus = ({ order }) => {
  return (
    <div className='order-price'>
      <div className='total'>
        <span>Total</span>
        {order.total}Ks
      </div>
      <div className='ordered-at'>
        <span className='first'>Ordered at</span>
        <span className='second'>
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>
      <div className='order-status-container'>
        <div className={`order-status ${order.status}`}></div>
        <div className='order-status-text'>
          <span>Order placed</span>
          <span>Confirmed</span>
          <span>On the way</span>
          <span>Delivered</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
