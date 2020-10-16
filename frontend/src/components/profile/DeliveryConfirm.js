import React, { useContext, useState, useEffect } from 'react';
import DeliveryContext from '../../context/delivery/deliveryContext';
import OrderContext from '../../context/order/orderContext';
import CartContext from '../../context/cart/cartContext';
import AlertContext from '../../context/alert/alertContext';
import './DeliveryConfirm.css';

const DeliveryConfirm = props => {
  const { name, phone, address, updateDelivery } = useContext(DeliveryContext);
  const orderContext = useContext(OrderContext);
  const cartContext = useContext(CartContext);
  const alertContext = useContext(AlertContext);

  const [delivery, setDelivery] = useState({
    name,
    phone,
    address,
    comment: '',
  });

  useEffect(() => {
    if (cartContext.products.length === 0) {
      props.history.push('/');
    }
    orderContext.getOrders();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (orderContext.error) {
      alertContext.setAlert(orderContext.error, 'danger');
      orderContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [orderContext.error]);

  const onChange = e =>
    setDelivery({
      ...delivery,
      [e.target.name]: e.target.value,
    });

  const onSubmit = e => {
    e.preventDefault();
    if (
      delivery.name === '' ||
      delivery.phone === '' ||
      delivery.address === ''
    ) {
      return alertContext.setAlert(
        'Please fill all the mendatory fields',
        'info'
      );
    }

    updateDelivery({ ...delivery });
    orderContext.addOrder({
      order: cartContext.products.map(product => {
        product.product = product._id;
        return product;
      }),
      receiver: delivery,
    });

    if (!orderContext.error) {
      cartContext.clearCart();
      alertContext.setAlert(
        'You have placed an order successfully.',
        'success'
      );
      props.history.push('/');
    }
  };

  return (
    <div className='deli-confirm container'>
      <p>Delivery Info</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={delivery.name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='text'
            name='phone'
            id='phone'
            value={delivery.phone}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <textarea
            name='address'
            id='address'
            cols='30'
            rows='10'
            onChange={onChange}
            value={delivery.address}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='comment'>Comment</label>
          <textarea
            name='comment'
            id='comment'
            cols='30'
            rows='10'
            value={delivery.comment}
            onChange={onChange}
          ></textarea>
        </div>
        <button className='submit'>Confirm</button>
      </form>
    </div>
  );
};

export default DeliveryConfirm;
