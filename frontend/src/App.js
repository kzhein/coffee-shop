import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import RestrictRoute from './components/routing/RestrictRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CartState from './context/cart/CartState';
import DeliveryState from './context/delivery/DeliveryState';
import OrderState from './context/order/OrderState';
import CategoryState from './context/category/CategoryState';
import TypeState from './context/type/TypeState';
import setAuthToken from './utils/setAuthToken';

const Login = lazy(() => import('./components/pages/Login'));
const Register = lazy(() => import('./components/pages/Register'));
const Cart = lazy(() => import('./components/pages/Cart'));
const Profile = lazy(() => import('./components/pages/Profile'));
const ForgotPassword = lazy(() => import('./components/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/pages/ResetPassword'));
const DeliveryConfirm = lazy(() =>
  import('./components/profile/DeliveryConfirm')
);
const Dashboard = lazy(() => import('./components/pages/Dashboard'));

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
              <CategoryState>
                <TypeState>
                  <Router>
                    <div className='App'>
                      <Navbar />
                      <Alerts />
                      <Suspense
                        fallback={
                          <h1
                            style={{ marginTop: '10rem', textAlign: 'center' }}
                          >
                            Loading...
                          </h1>
                        }
                      >
                        <Switch>
                          <Route exact path='/' component={Home} />
                          <Route exact path='/login' component={Login} />
                          <Route exact path='/register' component={Register} />
                          <Route exact path='/cart' component={Cart} />
                          <Route
                            exact
                            path='/forgot-password'
                            component={ForgotPassword}
                          />
                          <Route
                            exact
                            path='/reset-password/:token'
                            component={ResetPassword}
                          />
                          <PrivateRoute
                            exact
                            path='/profile'
                            component={Profile}
                          />
                          <PrivateRoute
                            exact
                            path='/delivery-info'
                            component={DeliveryConfirm}
                          />
                          <RestrictRoute
                            path='/dashboard'
                            component={Dashboard}
                            allowed={['admin']}
                          />
                        </Switch>
                      </Suspense>
                    </div>
                  </Router>
                </TypeState>
              </CategoryState>
            </AlertState>
          </OrderState>
        </DeliveryState>
      </CartState>
    </AuthState>
  );
};

export default App;
