import React, { useContext } from 'react';
import CategoryContext from '../../../context/category/categoryContext';
import Loading from '../../layout/Loading';
import './CategoriesTable.css';

const CategoriesTable = () => {
  const { categories, setCurrent, setNew, loading } = useContext(
    CategoryContext
  );

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
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              categories.map((category, index) => (
                <tr key={category._id} onClick={() => onClick(category._id)}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default CategoriesTable;
