import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Loading2 from '../layout/Loading2';
import './ResetPassword.css';

const ResetPassword = props => {
  const { setAlert } = useContext(AlertContext);
  const {
    error,
    clearErrors,
    isAuthenticated,
    loadUser,
    loading,
    success,
    clearSuccess,
    resetPassword,
  } = useContext(AuthContext);
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const { password, passwordConfirm } = formData;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (success) {
      setAlert(success, 'success');
      clearSuccess();
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [success, error, isAuthenticated, props.history]);

  const onSubmit = e => {
    e.preventDefault();

    if (password === '' || passwordConfirm === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password !== passwordConfirm) {
      setAlert(
        'Your new password and password confirmation do not match',
        'danger'
      );
    } else {
      resetPassword(token, formData);
    }
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='reset-password container'>
      <p>Enter your new password</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            onChange={onChange}
          />
        </div>
        <div className='reset-password-btn-container'>
          <button className='submit' disabled={loading}>
            Reset
            {loading && <Loading2 />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
