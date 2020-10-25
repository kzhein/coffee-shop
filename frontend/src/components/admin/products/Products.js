import React, { useEffect, useContext } from 'react';
import ProductsTable from './ProductsTable';
import ProductsModal from './ProductsModal';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import ProductContext from '../../../context/product/productContext';
import './Products.css';

const Products = () => {
  const { loadUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const {
    getAllProducts,
    success,
    error,
    clearSuccess,
    clearErrors,
  } = useContext(ProductContext);

  useEffect(() => {
    loadUser();
    getAllProducts();
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
    <div className='products'>
      <ProductsTable />
      <ProductsModal />
    </div>
  );
};

export default Products;
