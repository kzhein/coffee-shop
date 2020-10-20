import React, { useEffect, useContext } from 'react';
import ProductsTable from './ProductsTable';
import ProductsModal from './ProductsModal';
import AuthContext from '../../../context/auth/authContext';

const Products = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ProductsTable />
      <ProductsModal />
    </div>
  );
};

export default Products;
