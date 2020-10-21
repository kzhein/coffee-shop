import React, { Fragment, useContext, useEffect } from 'react';
import TypeContext from '../../../context/type/typeContext';
import './TypesModal.css';

const TypesModal = () => {
  const {
    current,
    newType,
    updateCurrent,
    updateType,
    deleteType,
    createType,
    updateNew,
    clearBoth,
  } = useContext(TypeContext);

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
      updateType(current);
      clearBoth();
    } else if (type === 'create') {
      createType(newType);
      clearBoth();
    } else {
      if (window.confirm('Are you sure you want to delete this type?')) {
        deleteType(current._id);
        clearBoth();
      }
    }
  };

  const onChange = e => {
    if (current) {
      updateCurrent({ ...current, [e.target.name]: e.target.value });
    } else if (newType) {
      updateNew({ ...newType, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {(current || newType) && (
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
                  value={current ? current.name : newType.name}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  id='description'
                  cols='30'
                  rows='5'
                  value={current ? current.description : newType.description}
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
                    Delete Type
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

export default TypesModal;
