import React, { useRef, useContext, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import UserContext from '../../../context/user/userContext';
import AuthContext from '../../../context/auth/authContext';
import Loading from '../../layout/Loading';
import './UsersTable.css';

const UsersTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const perPageRef = useRef(null);

  const { getAllUsers, users, total, loading, setCurrent } = useContext(
    UserContext
  );
  const { user: loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers(perPage, currentPage);
    // eslint-disable-next-line
  }, [perPage, currentPage]);

  const changePerPage = e => {
    e.preventDefault();
    const page = perPageRef.current.value * 1;
    if (page < 1) {
      return window.alert('Set a number greater than 0');
    }
    setPerPage(page);
  };

  const onClick = id => {
    setCurrent(id);
  };

  const handlePageClick = data => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div>
      <div className='per-page'>
        Per page:{' '}
        <form onSubmit={changePerPage}>
          <input
            type='text'
            name='per-page'
            placeholder='10'
            ref={perPageRef}
          />
        </form>
      </div>
      <div className='datatable-container'>
        <table className='datatable'>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              users.map((user, index) => (
                <tr key={user._id} onClick={() => onClick(user._id)}>
                  <td>{index + 1}</td>
                  <td
                    className={user._id === loggedInUser._id ? 'loggedin' : ''}
                  >
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <Loading />}
      </div>
      <div className='pagination'>
        <ReactPaginate
          pageCount={Math.ceil(total / perPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default UsersTable;
