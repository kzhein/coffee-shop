import React, { useContext, useEffect, useRef } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Loading2 from '../layout/Loading2';
import './ForgotPassword.css';

const ForgotPassword = props => {
  const { setAlert } = useContext(AlertContext);
  const {
    isAuthenticated,
    loadUser,
    loading,
    success,
    clearSuccess,
    error,
    clearErrors,
    forgotPassword,
  } = useContext(AuthContext);
  const email = useRef('');

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
      props.history.push('/');
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

    if (email.current.value === '') {
      setAlert('Please enter your email', 'danger');
    } else {
      // send email
      forgotPassword(email.current.value);
    }
  };

  return (
    <div className='forgot-password container'>
      <p>Enter your email address</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' ref={email} name='email' id='email' />
        </div>

        <div className='forgot-password-btn-container'>
          <button className='submit' disabled={loading}>
            Send Reset Email
            {loading && <Loading2 />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
