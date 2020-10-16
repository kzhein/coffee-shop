import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Loading2 from '../layout/Loading2';
import './Login.css';
import './Register.css';

const Register = props => {
  const { setAlert } = useContext(AlertContext);
  const {
    register,
    loadUser,
    loading,
    error,
    clearErrors,
    isAuthenticated,
  } = useContext(AuthContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, passwordConfirm } = user;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      register({
        name,
        email,
        password,
        passwordConfirm,
      });
    }
  };

  return (
    <div className='register container'>
      <p>Register</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
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
        <div className='form-group'>
          <label htmlFor='passwordConfirm'>Password Confirm</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <button className='submit' disabled={loading}>
          Register{loading && <Loading2 />}
        </button>
      </form>
    </div>
  );
};

export default Register;
