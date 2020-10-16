import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ type }) => {
  const [productList, setProductList] = useState([]);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    // to fix memory leak - updating the state of an unmounted component
    let isSubscribed = true;

    (async () => {
      try {
        const typeResult = await axios.get(`/api/v1/types?name=${type}`);

        const typeId = typeResult.data.data.types[0]._id;

        const productResult = await axios.get(
          `/api/v1/products?type=${typeId}`
        );

        if (isSubscribed) {
          setProductList(productResult.data.data.products);
        }
      } catch (error) {
        setAlert(
          'Something went wrong when fetching the product details from server.',
          'danger'
        );
      }
    })();

    return () => (isSubscribed = false);

    // eslint-disable-next-line
  }, []);

  return (
    <div className='product-list'>
      {productList.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
