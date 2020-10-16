import React from 'react';
import OrderItem from './OrderItem';
import './OrderItems.css';

const OrderItems = ({ order }) => {
  return (
    <div className='order-items'>
      {order.order.map(odr => (
        <OrderItem order={odr} key={odr.product._id} />
      ))}
    </div>
  );
};

export default OrderItems;
