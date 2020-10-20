import React, { useEffect, useContext } from 'react';
import AuthContext from '../../..//context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import TypeContext from '../../../context/type/typeContext';
import TypesTable from './TypesTable';
import TypesModal from './TypesModal';
import './Types.css';

const Types = () => {
  const { loadUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { getAllTypes, success, error, clearErrors, clearSuccess } = useContext(
    TypeContext
  );

  useEffect(() => {
    loadUser();
    getAllTypes();
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
    <div className='types'>
      <TypesTable />
      <TypesModal />
    </div>
  );
};

export default Types;
