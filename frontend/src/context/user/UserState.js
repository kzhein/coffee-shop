import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  GET_ALL_USERS,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_USER,
  USER_UPDATE_FAIL,
  DELETE_USER,
  USER_DELETE_FAIL,
  USER_ERROR,
  START_LOADING,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  CLEAR_CURRENT,
} from '../types';

const UserState = props => {
  const initialState = {
    users: [],
    total: 0,
    success: null,
    error: null,
    loading: false,
    current: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get all users
  const getAllUsers = async (perPage, currentPage) => {
    try {
      dispatch({ type: START_LOADING });
      const res = await axios.get(
        `/api/v1/users?limit=${perPage}&page=${currentPage}`
      );
      dispatch({
        type: GET_ALL_USERS,
        payload: { users: res.data.data.users, total: res.data.total },
      });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.message });
    }
  };

  const setCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: SET_CURRENT, payload: current });
  };

  const updateUser = async current => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { user },
        },
      } = await axios.patch(`/api/v1/users/${current._id}`, current);

      dispatch({
        type: UPDATE_USER,
        payload: {
          user,
          success: 'User updated successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const deleteUser = async user => {
    try {
      dispatch({ type: START_LOADING });
      await axios.delete(`/api/v1/users/${user}`);

      dispatch({
        type: DELETE_USER,
        payload: {
          user,
          success: 'User deleted successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const updateCurrent = current => {
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_CURRENT, payload: current });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        total: state.total,
        success: state.success,
        error: state.error,
        loading: state.loading,
        current: state.current,
        newUser: state.newUser,
        getAllUsers,
        setCurrent,
        updateCurrent,
        updateUser,
        deleteUser,
        clearCurrent,
        clearErrors,
        clearSuccess,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
