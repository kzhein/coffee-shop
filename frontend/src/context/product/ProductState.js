import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  GET_ALL_PRODUCTS,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_PRODUCT,
  PRODUCT_UPDATE_FAIL,
  DELETE_PRODUCT,
  PRODUCT_DELETE_FAIL,
  CREATE_PRODUCT,
  PRODUCT_CREATE_FAIL,
  SET_NEW_PRODUCT,
  CLEAR_BOTH,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  PRODUCT_ERROR,
  START_LOADING,
} from '../types';

const ProductState = props => {
  const initialState = {
    products: [],
    success: null,
    error: null,
    loading: false,
    current: null,
    newProduct: false,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const createProduct = async formData => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { product },
        },
      } = await axios.post('/api/v1/products', formData, config);

      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          product,
          success: 'Product created successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const updateProduct = async (formData, productId) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { product },
        },
      } = await axios.patch(`/api/v1/products/${productId}`, formData, config);

      dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          product,
          success: 'Product updated successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      dispatch({ type: START_LOADING });
      const res = await axios.get('/api/v1/products');
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data.data.products,
      });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.message });
    }
  };

  const setCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: SET_CURRENT, payload: current });
  };

  const setNew = () => {
    dispatch({ type: SET_NEW_PRODUCT });
  };

  const deleteProduct = async product => {
    try {
      dispatch({ type: START_LOADING });
      await axios.delete(`/api/v1/products/${product}`);

      dispatch({
        type: DELETE_PRODUCT,
        payload: {
          product,
          success: 'Product deleted successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const updateCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_CURRENT, payload: current });
  };

  const clearBoth = () => {
    dispatch({ type: CLEAR_BOTH });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        success: state.success,
        error: state.error,
        loading: state.loading,
        current: state.current,
        newProduct: state.newProduct,
        createProduct,
        getAllProducts,
        setCurrent,
        updateCurrent,
        updateProduct,
        deleteProduct,
        setNew,
        clearBoth,
        clearErrors,
        clearSuccess,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
