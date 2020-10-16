import React, { Fragment } from 'react';
import loading from './loading-2.gif';

const Loading2 = () => {
  return (
    <Fragment>
      <img
        src={loading}
        alt='Loading...'
        style={{
          width: '20px',
          display: 'inline-block',
          // backgroundColor: 'red',
        }}
      />
    </Fragment>
  );
};

export default Loading2;
