import React, { useEffect, useContext } from 'react';
import OrdersTable from './OrdersTable';
import OrdersModal from './OrdersModal';
import AuthContext from '../../context/auth/authContext';

const Orders = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <OrdersTable />
      <OrdersModal />
    </div>
  );
};

export default Orders;
