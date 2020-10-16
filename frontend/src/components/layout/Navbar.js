import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import CartContext from '../../context/cart/cartContext';
import OrderContext from '../../context/order/orderContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { products, clearCart } = useContext(CartContext);
  const { clearOrders } = useContext(OrderContext);

  const history = useHistory();

  const onLogout = () => {
    logout();
    clearCart();
    clearOrders();

    history.push('/');
    // props.history.push('/');
  };

  return (
    <nav>
      <Link to='/' className='logo'>
        <i className='fas fa-coffee'></i>
      </Link>
      <ul>
        {!isAuthenticated && (
          <Fragment>
            <li>
              <Link className='highlight' to='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </Fragment>
        )}

        <li>
          <Link to='/cart'>
            <i className='fas fa-shopping-cart'></i>
          </Link>
          <span className='count'>{products.length}</span>
        </li>

        {isAuthenticated && (
          <Fragment>
            <li className='avatar'>
              <Link to='/profile'>
                <i className='fas fa-user-alt'></i>
              </Link>
            </li>
            <li>
              <a href='#!' onClick={onLogout}>
                Logout
              </a>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
