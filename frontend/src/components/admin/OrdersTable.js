import React, { useRef, useContext, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import OrderContext from '../../context/order/orderContext';
import AlertContext from '../../context/alert/alertContext';
import Loading from '../layout/Loading';
import './OrdersTable.css';

const OrdersTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageRef = useRef(null);
  const { setAlert } = useContext(AlertContext);
  const {
    getAllOrders,
    orders,
    total,
    loading,
    setCurrent,
    success,
    error,
    clearErrors,
    clearSuccess,
  } = useContext(OrderContext);

  useEffect(() => {
    getAllOrders(perPage, currentPage);
  }, [perPage, currentPage]);

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

  const changePerPage = e => {
    e.preventDefault();
    const page = perPageRef.current.value * 1;
    if (page < 1) {
      return window.alert('Set a number greater than 0');
    }
    setPerPage(page);
  };

  const onClick = id => {
    setCurrent(id);
  };

  const handlePageClick = data => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div>
      <div className='per-page'>
        Per page:{' '}
        <form onSubmit={changePerPage}>
          <input
            type='text'
            name='per-page'
            placeholder='10'
            ref={perPageRef}
          />
        </form>
      </div>
      <div className='datatable-container'>
        <table className='datatable'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              orders.map(order => (
                <tr key={order._id} onClick={() => onClick(order._id)}>
                  <td>{order.receiver.name}</td>
                  <td>{order.receiver.phone}</td>
                  <td>
                    {order.order
                      .map(odr => `${odr.product.name} ( ${odr.quantity} )`)
                      .join(' | ')}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loading />}
      </div>
      <div className='pagination'>
        <ReactPaginate
          pageCount={Math.ceil(total / perPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default OrdersTable;
