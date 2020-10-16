import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';
import DeliveryConfirm from './components/profile/DeliveryConfirm';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CartState from './context/cart/CartState';
import DeliveryState from './context/delivery/DeliveryState';
import OrderState from './context/order/OrderState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <CartState>
        <DeliveryState>
          <OrderState>
            <AlertState>
              <Router>
                <div className='App'>
                  <Navbar />
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/cart' component={Cart} />
                    <PrivateRoute exact path='/profile' component={Profile} />
                    <PrivateRoute
                      exact
                      path='/delivery-info'
                      component={DeliveryConfirm}
                    />
                  </Switch>
                </div>
              </Router>
            </AlertState>
          </OrderState>
        </DeliveryState>
      </CartState>
    </AuthState>
  );
};

export default App;
