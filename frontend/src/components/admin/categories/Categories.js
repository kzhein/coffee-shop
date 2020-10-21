import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import CategoryContext from '../../../context/category/categoryContext';
import CategoriesTable from './CategoriesTable';
import CategoriesModal from './CategoriesModal';
import './Categories.css';

const Categories = () => {
  const { loadUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const {
    getAllCategories,
    success,
    error,
    clearErrors,
    clearSuccess,
  } = useContext(CategoryContext);

  useEffect(() => {
    loadUser();
    getAllCategories();
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
    <div className='categories'>
      <CategoriesTable />
      <CategoriesModal />
    </div>
  );
};

export default Categories;
