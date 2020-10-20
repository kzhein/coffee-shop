import React, { useContext } from 'react';
import TypeContext from '../../../context/type/typeContext';
import Loading from '../../layout/Loading';
import './TypesTable.css';

const TypesTable = () => {
  const { types, setCurrent, setNew, loading } = useContext(TypeContext);

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
              types.map((type, index) => (
                <tr key={type._id} onClick={() => onClick(type._id)}>
                  <td>{index + 1}</td>
                  <td>{type.name}</td>
                  <td>{type.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default TypesTable;
