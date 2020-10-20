import React, { useContext, useEffect } from 'react';
import CategoryContext from '../../../context/category/categoryContext';
import './CategoriesModal.css';

const CategoriesModal = () => {
  const {
    current,
    newCategory,
    updateCurrent,
    updateCategory,
    deleteCategory,
    createCategory,
    updateNew,
    clearBoth,
  } = useContext(CategoryContext);

  useEffect(() => {
    window.onclick = e => {
      if (e.target.id === 'myModal') {
        clearBoth();
      }
    };
    // eslint-disable-next-line
  }, []);

  const onSubmit = e => e.preventDefault();

  const onClick = type => {
    if (type === 'update') {
      updateCategory(current);
      clearBoth();
    } else if (type === 'create') {
      createCategory(newCategory);
      clearBoth();
    } else {
      if (window.confirm('Are you sure you want to delete this category?')) {
        deleteCategory(current._id);
        clearBoth();
      }
    }
  };

  const onChange = e => {
    if (current) {
      updateCurrent({ ...current, [e.target.name]: e.target.value });
    } else if (newCategory) {
      updateNew({ ...newCategory, [e.target.name]: e.target.value });
    }
  };

  return (
    (current || newCategory) && (
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={clearBoth}>
            &times;
          </span>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                value={current ? current.name : newCategory.name}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Description</label>
              <textarea
                name='description'
                id='description'
                cols='30'
                rows='5'
                value={current ? current.description : newCategory.description}
                onChange={onChange}
              ></textarea>
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
                  Delete Category
                </button>
              )}
              <button className='button button-cancel' onClick={clearBoth}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CategoriesModal;
