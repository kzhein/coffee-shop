import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Orders from '../admin/Orders';
import Products from '../admin/Products';
import Categories from '../admin/Categories';
import Types from '../admin/Types';
import Users from '../admin/Users';
import './Dashboard.css';

const Dashboard = ({ match }) => {
  return (
    <Router>
      <div className='dashboard container'>
        <div className='dashboard-nav-container'>
          <div className='dashboard-nav active'>
            <Link to='/dashboard'>Orders</Link>
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
          <Route exact path='/dashboard' component={Orders} />
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
