import React, { useReducer } from 'react';
import axios from 'axios';
import TypeContext from './typeContext';
import typeReducer from './typeReducer';
import {
  GET_ALL_TYPES,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_TYPE,
  TYPE_UPDATE_FAIL,
  DELETE_TYPE,
  TYPE_DELETE_FAIL,
  CREATE_TYPE,
  TYPE_CREATE_FAIL,
  UPDATE_NEW,
  SET_NEW_TYPE,
  CLEAR_BOTH,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  TYPE_ERROR,
  START_LOADING,
} from '../types';

const TypeState = props => {
  const initialState = {
    types: [],
    success: null,
    error: null,
    loading: false,
    current: null,
    newType: null,
  };

  const [state, dispatch] = useReducer(typeReducer, initialState);

  const createType = async tp => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { type },
        },
      } = await axios.post('/api/v1/types', tp);

      dispatch({
        type: CREATE_TYPE,
        payload: {
          type,
          success: 'Type created successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: TYPE_CREATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Get all types
  const getAllTypes = async () => {
    try {
      dispatch({ type: START_LOADING });
      const res = await axios.get('/api/v1/types');
      dispatch({
        type: GET_ALL_TYPES,
        payload: res.data.data.types,
      });
    } catch (err) {
      dispatch({ type: TYPE_ERROR, payload: err.response.message });
    }
  };

  const setCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: SET_CURRENT, payload: current });
  };

  const setNew = () => {
    dispatch({ type: SET_NEW_TYPE });
  };

  const updateType = async current => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { type },
        },
      } = await axios.patch(`/api/v1/types/${current._id}`, current);

      dispatch({
        type: UPDATE_TYPE,
        payload: {
          type,
          success: 'Type updated successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: TYPE_UPDATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const deleteType = async type => {
    try {
      dispatch({ type: START_LOADING });
      await axios.delete(`/api/v1/types/${type}`);

      dispatch({
        type: DELETE_TYPE,
        payload: {
          type,
          success: 'Type deleted successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: TYPE_DELETE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const updateCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_CURRENT, payload: current });
  };

  const updateNew = newType => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_NEW, payload: newType });
  };

  const clearBoth = () => {
    dispatch({ type: CLEAR_BOTH });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  return (
    <TypeContext.Provider
      value={{
        types: state.types,
        success: state.success,
        error: state.error,
        loading: state.loading,
        current: state.current,
        newType: state.newType,
        createType,
        getAllTypes,
        setCurrent,
        updateCurrent,
        updateType,
        deleteType,
        updateNew,
        setNew,
        clearBoth,
        clearErrors,
        clearSuccess,
      }}
    >
      {props.children}
    </TypeContext.Provider>
  );
};

export default TypeState;
