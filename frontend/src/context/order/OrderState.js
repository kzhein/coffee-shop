import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';
import {
  GET_ORDERS,
  GET_ALL_ORDERS,
  ADD_ORDER,
  SET_CURRENT,
  UPDATE_ORDER,
  DELETE_ORDER,
  ORDER_UPDATE_FAIL,
  ORDER_DELETE_FAIL,
  UPDATE_CURRENT,
  CLEAR_CURRENT,
  CLEAR_ORDERS,
  ORDER_ERROR,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  START_LOADING,
} from '../types';

const OrderState = props => {
  const initialState = {
    orders: [],
    total: 0,
    success: null,
    error: null,
    loading: false,
    current: null,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Get all orders(admin)
  const getAllOrders = async (perPage, currentPage) => {
    try {
      dispatch({ type: START_LOADING });
      const res = await axios.get(
        `/api/v1/orders?limit=${perPage}&page=${currentPage}`
      );
      dispatch({
        type: GET_ALL_ORDERS,
        payload: { orders: res.data.data.orders, total: res.data.total },
      });
    } catch (err) {
      dispatch({ type: ORDER_ERROR, payload: err.response.message });
    }
  };

  // Set current order(admin)
  const setCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: SET_CURRENT, payload: current });
  };

  // Update current(admin)
  const updateCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_CURRENT, payload: current });
  };

  // Update order(admin)
  const updateOrder = async current => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { order },
        },
      } = await axios.patch(`/api/v1/orders/${current._id}`, current);

      dispatch({
        type: UPDATE_ORDER,
        payload: {
          order,
          success: 'Order updated successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: ORDER_UPDATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Delete order(admin)
  const deleteOrder = async order => {
    try {
      dispatch({ type: START_LOADING });
      await axios.delete(`/api/v1/orders/${order}`);

      dispatch({
        type: DELETE_ORDER,
        payload: {
          order,
          success: 'Order deleted successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: ORDER_DELETE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Clear current(admin)
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

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

  // Clear Success
  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        total: state.total,
        success: state.success,
        error: state.error,
        loading: state.loading,
        current: state.current,
        getOrders,
        getAllOrders,
        addOrder,
        updateOrder,
        deleteOrder,
        setCurrent,
        updateCurrent,
        clearCurrent,
        clearOrders,
        clearErrors,
        clearSuccess,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
