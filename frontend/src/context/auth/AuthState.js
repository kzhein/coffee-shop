import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  START_LOADING,
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    success: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          data: { user },
        },
      } = await axios.get('/api/v1/users/me');

      dispatch({ type: USER_LOADED, payload: user });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          token,
          data: { user },
        },
      } = await axios.post('/api/v1/users/signup', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token,
          user,
          success: 'Registered successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          token,
          data: { user },
        },
      } = await axios.post('/api/v1/users/login', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
          success: 'Logged in successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Update password
  const updatePassword = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          token,
          data: { user },
        },
      } = await axios.patch('/api/v1/users/updateMyPassword', formData, config);

      dispatch({
        type: PASSWORD_UPDATE_SUCCESS,
        payload: {
          token,
          user,
          success: 'Password updated successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_UPDATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Forgot password(Request a password reset email)
  const forgotPassword = async email => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: START_LOADING });

      await axios.post('/api/v1/users/forgotPassword', { email }, config);

      dispatch({
        type: PASSWORD_FORGOT_SUCCESS,
        payload: {
          success: 'Password reset email is sent successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_FORGOT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Reset Password
  const resetPassword = async (resetToken, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: START_LOADING });
      const {
        data: {
          token,
          data: { user },
        },
      } = await axios.patch(
        `/api/v1/users/resetPassword/${resetToken}`,
        formData,
        config
      );

      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: {
          token,
          user,
          success: 'Password has been reset successfully',
        },
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Success
  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        success: state.success,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        clearSuccess,
        updatePassword,
        forgotPassword,
        resetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
