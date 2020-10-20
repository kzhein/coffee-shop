import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import OrderContext from '../../../context/order/orderContext';
import OrdersTable from './OrdersTable';
import OrdersModal from './OrdersModal';

const Orders = () => {
  const { loadUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { success, error, clearErrors, clearSuccess } = useContext(
    OrderContext
  );

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (success) {
      setAlert(success, 'success');
      clearSuccess();
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [success, error]);

  return (
    <div className='orders'>
      <OrdersTable />
      <OrdersModal />
    </div>
  );
};

export default Orders;
