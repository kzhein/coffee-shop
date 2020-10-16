import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Loading2 from '../layout/Loading2';
import './Login.css';

const Login = props => {
  const { setAlert } = useContext(AlertContext);
  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    loadUser,
    loading,
  } = useContext(AuthContext);
  const { from } = props.location.state || { from: { pathname: '/' } };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push(from.pathname);
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='login container'>
      <p>Log in to your account</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <button className='submit' disabled={loading}>
          Login
          {loading && <Loading2 />}
        </button>
      </form>
    </div>
  );
};

export default Login;
