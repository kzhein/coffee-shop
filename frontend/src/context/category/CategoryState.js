import React, { useReducer } from 'react';
import axios from 'axios';
import CategoryContext from './categoryContext';
import categoryReducer from './categoryReducer';
import {
  GET_ALL_CATEGORIES,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_CATEGORY,
  CATEGORY_UPDATE_FAIL,
  DELETE_CATEGORY,
  CATEGORY_DELETE_FAIL,
  CREATE_CATEGORY,
  CATEGORY_CREATE_FAIL,
  UPDATE_NEW,
  SET_NEW_CATEGORY,
  CLEAR_BOTH,
  CATEGORY_ERROR,
  START_LOADING,
} from '../types';

const CategoryState = props => {
  const initialState = {
    categories: [],
    success: null,
    error: null,
    loading: false,
    current: null,
    newCategory: null,
  };

  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const createCategory = async cat => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { category },
        },
      } = await axios.post('/api/v1/categories', cat);

      dispatch({
        type: CREATE_CATEGORY,
        payload: {
          category,
          success: 'Category created successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      dispatch({ type: START_LOADING });
      const res = await axios.get('/api/v1/categories');
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: res.data.data.categories,
      });
    } catch (err) {
      dispatch({ type: CATEGORY_ERROR, payload: err.response.message });
    }
  };

  const setCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: SET_CURRENT, payload: current });
  };

  const setNew = () => {
    dispatch({ type: SET_NEW_CATEGORY });
  };

  const updateCategory = async current => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { category },
        },
      } = await axios.patch(`/api/v1/categories/${current._id}`, current);

      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          category,
          success: 'Category updated successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const deleteCategory = async category => {
    try {
      dispatch({ type: START_LOADING });
      await axios.delete(`/api/v1/categories/${category}`);

      dispatch({
        type: DELETE_CATEGORY,
        payload: {
          category,
          success: 'Category deleted successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const updateCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_CURRENT, payload: current });
  };

  const updateNew = newCat => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_NEW, payload: newCat });
  };

  const clearBoth = () => {
    dispatch({ type: CLEAR_BOTH });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        success: state.success,
        error: state.error,
        loading: state.loading,
        current: state.current,
        newCategory: state.newCategory,
        createCategory,
        getAllCategories,
        setCurrent,
        updateCurrent,
        updateCategory,
        deleteCategory,
        updateNew,
        setNew,
        clearBoth,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
