import React, { useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink as Link,
} from 'react-router-dom';
import Orders from '../admin/orders/Orders';
import Products from '../admin/products/Products';
import Categories from '../admin/categories/Categories';
import Types from '../admin/types/Types';
import Users from '../admin/users/Users';
import AuthContext from '../../context/auth/authContext';
import './Dashboard.css';

const Dashboard = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className='dashboard container'>
        <div className='dashboard-nav-container'>
          <div className='dashboard-nav '>
            <Link exact to='/dashboard'>
              Orders
            </Link>
          </div>
          <div className='dashboard-nav '>
            <Link to='/dashboard/products'>Products</Link>
          </div>
          <div className='dashboard-nav '>
            <Link to='/dashboard/categories'>Categories</Link>
          </div>
          <div className='dashboard-nav '>
            <Link to='/dashboard/types'>Types</Link>
          </div>
          <div className='dashboard-nav '>
            <Link to='/dashboard/users'>Users</Link>
          </div>
        </div>

        <Switch>
          <Route exact path={'/dashboard'} component={Orders} />
          <Route exact path='/dashboard/products' component={Products} />
          <Route exact path='/dashboard/categories' component={Categories} />
          <Route exact path='/dashboard/types' component={Types} />
          <Route exact path='/dashboard/users' component={Users} />
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;
