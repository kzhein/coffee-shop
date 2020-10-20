import React, { useEffect, useContext } from 'react';
import OrderContext from '../../../context/order/orderContext';
import './OrdersModal.css';

const OrdersModal = () => {
  const {
    current,
    updateOrder,
    deleteOrder,
    updateCurrent,
    clearCurrent,
  } = useContext(OrderContext);

  useEffect(() => {
    window.onclick = e => {
      if (e.target.id === 'myModal') {
        clearCurrent();
      }
    };
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    updateCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const onSubmit = e => e.preventDefault();

  const onClick = type => {
    if (type === 'update') {
      updateOrder(current);
      clearCurrent();
    } else if (type === 'delete') {
      if (window.confirm('Are you sure you want to delete this order?')) {
        deleteOrder(current._id);
        clearCurrent();
      }
    }
  };

  return (
    current && (
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={clearCurrent}>
            &times;
          </span>
          <form onSubmit={onSubmit}>
            <p className='name'>{current.receiver.name}</p>
            <p className='email'>({current.user.email})</p>
            <p className='date'>
              {new Date(current.createdAt).toLocaleString()}
            </p>
            <p>
              <span className='total'>Total:</span>{' '}
              {new Intl.NumberFormat('en-US').format(current.total)}Ks
            </p>
            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <textarea
                value={current.receiver.address}
                name='address'
                id='address'
                cols='30'
                rows='5'
                disabled
              ></textarea>
            </div>
            <div className='form-group'>
              <label htmlFor='comment'>Comment</label>
              <textarea
                value={current.receiver.comment}
                name='comment'
                id='comment'
                cols='30'
                rows='5'
                disabled
              ></textarea>
            </div>
            {current.order.map((odr, index) => (
              <div key={index} className='form-group'>
                <label>{odr.product.name}</label>
                <input
                  type='text'
                  value={odr.quantity}
                  name=''
                  id=''
                  disabled
                />
              </div>
            ))}

            <div className='form-group'>
              <select
                name='status'
                id='status'
                value={current.status}
                onChange={onChange}
              >
                <option value='placed'>Placed</option>
                <option value='confirmed'>Confirmed</option>
                <option value='ontheway'>On the way</option>
                <option value='delivered'>Delivered</option>
              </select>
              <button
                className='button button-update'
                onClick={() => onClick('update')}
              >
                Update
              </button>
              <button
                className='button button-delete'
                onClick={() => onClick('delete')}
              >
                Delete Order
              </button>
              <button className='button button-cancel' onClick={clearCurrent}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default OrdersModal;
