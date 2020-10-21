import React, { Fragment, useContext, useEffect, useRef } from 'react';
import ProductContext from '../../../context/product/productContext';
import CategoryContext from '../../../context/category/categoryContext';
import TypeContext from '../../../context/type/typeContext';
import './ProductsModal.css';

const ProductsModal = () => {
  const {
    createProduct,
    current,
    updateCurrent,
    newProduct,
    updateProduct,
    deleteProduct,
    clearBoth,
  } = useContext(ProductContext);
  const { getAllCategories, categories } = useContext(CategoryContext);
  const { getAllTypes, types } = useContext(TypeContext);
  const form = useRef(null);

  useEffect(() => {
    getAllCategories();
    getAllTypes();
    window.onclick = e => {
      if (e.target.id === 'myModal') {
        clearBoth();
      }
    };
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    if (current) {
      updateCurrent({ ...current, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  const onClick = type => {
    const data = new FormData(form.current);

    if (type === 'update') {
      updateProduct(data, current._id);
      clearBoth();
    } else if (type === 'create') {
      createProduct(data);
      clearBoth();
    } else {
      if (window.confirm('Are you sure you want to delete this product?')) {
        deleteProduct(current._id);
        clearBoth();
      }
    }
  };

  return (
    <Fragment>
      {(current || newProduct) && (
        <div id='myModal' className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={clearBoth}>
              &times;
            </span>
            <form onSubmit={onSubmit} ref={form} encType='multipart/form-data'>
              <div className='form-group'>
                <label>Name</label>
                <input
                  type='text'
                  value={current ? current.name : null}
                  onChange={onChange}
                  name='name'
                  id='name'
                />
              </div>
              <div className='form-group'>
                <label>Price</label>
                <input
                  type='number'
                  value={current ? current.price : null}
                  onChange={onChange}
                  name='price'
                  id='price'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  id='description'
                  cols='30'
                  rows='5'
                  value={current ? current.description : null}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <select
                  name='category'
                  id='category'
                  value={current ? current.category._id : null}
                  onChange={onChange}
                  required
                >
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='type'>Type</label>
                <select
                  name='type'
                  id='type'
                  value={current ? current.type._id : null}
                  onChange={onChange}
                  required
                >
                  {types.map(type => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='image'>Image</label>
                <input type='file' name='image' id='image' />
              </div>

              <div className='form-group'>
                <button
                  className='button button-update'
                  onClick={() => {
                    current ? onClick('update') : onClick('create');
                  }}
                >
                  {current ? 'Update' : 'Create'}
                </button>
                {current && (
                  <button
                    className='button button-delete'
                    onClick={() => onClick('delete')}
                  >
                    Delete Product
                  </button>
                )}
                <button className='button button-cancel' onClick={clearBoth}>
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

export default ProductsModal;
