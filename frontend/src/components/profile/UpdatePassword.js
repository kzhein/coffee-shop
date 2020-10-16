import React from 'react';
import './UpdatePassword.css';

const UpdatePassword = () => {
  return (
    <div className='update-password container'>
      <p>Change Password</p>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='old_password'>Old Password</label>
          <input type='password' name='old_password' id='old_password' />
        </div>
        <div className='form-group'>
          <label htmlFor='new_password'>New Password</label>
          <input type='password' name='new_password' id='new_password' />
        </div>
        <div className='form-group'>
          <label htmlFor='confirm_new_password'>Confirm New Password</label>
          <input
            type='password'
            name='confirm_new_password'
            id='confirm_new_password'
          />
        </div>
        <button className='submit'>Update</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
