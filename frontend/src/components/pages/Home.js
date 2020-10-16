import React, { Fragment, useEffect, useContext } from 'react';
import ProductList from '../products/ProductList';
import AuthContext from '../../context/auth/authContext';
import './Home.css';

const Home = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <section className='intro'>
        <div className='container'>
          <p>
            "Good ideas start with brainstroming. Great ideas start with
            coffee."
          </p>
        </div>
      </section>
      <section id='coffee-display'>
        <h2>Hot Coffees</h2>
        <ProductList type='hot coffees' />
        <h2>Hot Teas</h2>
        <ProductList type='hot teas' />
      </section>
    </Fragment>
  );
};

export default Home;
