import React, { useContext } from 'react';
import ProductContext from '../../../context/product/productContext';
import './ProductsTable.css';
import Loading from '../../layout/Loading';

const ProductsTable = () => {
  const { loading, setCurrent, setNew, products } = useContext(ProductContext);

  const onClick = id => {
    setCurrent(id);
  };

  return (
    <div>
      <div className='add-new'>
        <a href='#!' id='add-new' onClick={setNew}>
          <i className='fas fa-plus'></i> New
        </a>
      </div>

      <div className='datatable-container'>
        <table className='datatable'>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              products.map((product, index) => (
                <tr key={product._id} onClick={() => onClick(product._id)}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`/img/products/${product.image}`}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>{product.type.name}</td>
                  <td>
                    {new Intl.NumberFormat('en-US').format(product.price)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default ProductsTable;
