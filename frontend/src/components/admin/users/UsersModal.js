import React, { Fragment, useEffect, useContext } from 'react';
import UserContext from '../../../context/user/userContext';
import './UsersModal.css';

const UsersModal = () => {
  const {
    current,
    updateUser,
    deleteUser,
    updateCurrent,
    clearCurrent,
  } = useContext(UserContext);

  useEffect(() => {
    window.onclick = e => {
      if (e.target.id === 'myModal') {
        clearCurrent();
      }
    };
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    updateCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const onSubmit = e => e.preventDefault();

  const onClick = type => {
    if (type === 'update') {
      updateUser(current);
      clearCurrent();
    } else if (type === 'delete') {
      if (window.confirm('Are you sure you want to delete this user?')) {
        deleteUser(current._id);
        clearCurrent();
      }
    }
  };

  return (
    <Fragment>
      {current && (
        <div id='myModal' className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={clearCurrent}>
              &times;
            </span>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={current.name}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={current.email}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <select
                  name='role'
                  id='role'
                  value={current.role}
                  onChange={onChange}
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
                <button
                  className='button button-update'
                  onClick={() => onClick('update')}
                >
                  Update
                </button>
                <button
                  className='button button-delete'
                  onClick={() => onClick('delete')}
                >
                  Delete User
                </button>
                <button className='button button-cancel' onClick={clearCurrent}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UsersModal;
