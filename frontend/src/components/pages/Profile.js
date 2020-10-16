import React, { useContext, useEffect } from 'react';
import OrderContext from '../../context/order/orderContext';
import AuthContext from '../../context/auth/authContext';
import OrderItems from '../orders/OrderItems';
import OrderStatus from '../orders/OrderStatus';
import UpdatePassword from '../profile/UpdatePassword';
import Loading from '../layout/Loading';
import './Profile.css';

const Profile = () => {
  const { getOrders, loading, orders } = useContext(OrderContext);
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    getOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='profile'>
      <p>Your Orders</p>
      <div className='order container'>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className='info-text'>You have no orders</div>
        ) : (
          orders.map(order => (
            <div key={order._id} className='order-card'>
              <OrderItems order={order} />
              <OrderStatus order={order} />
            </div>
          ))
        )}
      </div>
      <div className='deli-info-pwd'>
        <UpdatePassword />
      </div>
    </div>
  );
};

export default Profile;
