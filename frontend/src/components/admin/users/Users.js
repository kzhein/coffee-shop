import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import UserContext from '../../../context/user/userContext';
import UsersTable from './UsersTable';
import UsersModal from './UsersModal';
import './Users.css';

const Users = () => {
  const { loadUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { success, error, clearErrors, clearSuccess } = useContext(UserContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

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

  return (
    <div className='users'>
      <UsersTable />
      <UsersModal />
    </div>
  );
};

export default Users;
