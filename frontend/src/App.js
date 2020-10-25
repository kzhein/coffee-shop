import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import DeliveryConfirm from './components/profile/DeliveryConfirm';
import NotFound from './components/pages/NotFound';
import LiveChat from './components/live_chat/LiveChat';
import Footer from './components/footer/Footer';

import PrivateRoute from './components/routing/PrivateRoute';
import RestrictRoute from './components/routing/RestrictRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CartState from './context/cart/CartState';
import DeliveryState from './context/delivery/DeliveryState';
import OrderState from './context/order/OrderState';
import CategoryState from './context/category/CategoryState';
import TypeState from './context/type/TypeState';
import ProductState from './context/product/ProductState';
import UserState from './context/user/UserState';
import setAuthToken from './utils/setAuthToken';

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
                  <ProductState>
                    <UserState>
                      <Router>
                        <div className='App'>
                          <Navbar />
                          <Alerts />
                          <LiveChat />

                          <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                            <Route
                              exact
                              path='/register'
                              component={Register}
                            />
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

                            <Suspense
                              fallback={
                                <h1
                                  style={{
                                    marginTop: '10rem',
                                    textAlign: 'center',
                                  }}
                                >
                                  Loading...
                                </h1>
                              }
                            >
                              <RestrictRoute
                                path='/dashboard'
                                component={Dashboard}
                                allowed={['admin']}
                              />
                            </Suspense>
                            <Route component={NotFound} />
                          </Switch>
                          <Footer />
                        </div>
                      </Router>
                    </UserState>
                  </ProductState>
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
