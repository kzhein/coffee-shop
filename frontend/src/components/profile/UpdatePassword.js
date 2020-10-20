import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Loading2 from '../layout/Loading2';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const {
    loading,
    updatePassword,
    error,
    clearErrors,
    success,
    clearSuccess,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  const [formData, setFormData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const { passwordCurrent, password, passwordConfirm } = formData;

  useEffect(() => {
    if (success) {
      setAlert(success, 'success');
      clearSuccess();
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [success, error]);

  const onSubmit = e => {
    e.preventDefault();
    if (passwordCurrent === '' || password === '' || passwordConfirm === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password !== passwordConfirm) {
      setAlert('New password and password confirm do not match', 'danger');
    } else {
      updatePassword(formData);
      setFormData({
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
      });
    }
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='update-password container'>
      <p>Change Password</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='old_password'>Old Password</label>
          <input
            type='password'
            value={passwordCurrent}
            onChange={onChange}
            name='passwordCurrent'
            id='passwordCurrent'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='new_password'>New Password</label>
          <input
            type='password'
            value={password}
            onChange={onChange}
            name='password'
            id='password'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirm_new_password'>Confirm New Password</label>
          <input
            type='password'
            value={passwordConfirm}
            onChange={onChange}
            name='passwordConfirm'
            id='passwordConfirm'
          />
        </div>
        <div className='update-password-btn-container'>
          <button className='submit' disabled={loading}>
            Update{loading && <Loading2 />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
