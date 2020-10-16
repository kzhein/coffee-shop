import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';
import {
  GET_ORDERS,
  ADD_ORDER,
  CLEAR_ORDERS,
  ORDER_ERROR,
  CLEAR_ERRORS,
  START_LOADING,
} from '../types';

const OrderState = props => {
  const initialState = {
    orders: [],
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Get orders
  const getOrders = async () => {
    try {
      dispatch({ type: START_LOADING });
      const res = await axios.get('/api/v1/orders/getMyOrders');
      dispatch({ type: GET_ORDERS, payload: res.data.data.orders });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.response.message });
    }
  };

  // Add order
  const addOrder = async order => {
    try {
      const res = await axios.post('/api/v1/orders', order);

      dispatch({ type: ADD_ORDER, payload: res.data.data.order });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.response.message });
    }
  };

  // Clear orders
  const clearOrders = () => dispatch({ type: CLEAR_ORDERS });

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        error: state.error,
        loading: state.loading,
        getOrders,
        addOrder,
        clearOrders,
        clearErrors,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
