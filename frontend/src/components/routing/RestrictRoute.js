import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const RestrictRoute = ({ component: Component, allowed, ...rest }) => {
  let { loading, user } = useContext(AuthContext);

  if (!user) {
    user = { role: '' };
  }

  return (
    <Route
      {...rest}
      render={props =>
        !loading && !allowed.includes(user.role) ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RestrictRoute;
