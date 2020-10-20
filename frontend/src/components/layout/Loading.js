import React, { Fragment } from 'react';
import loading from './loading.gif';

const Loading = ({ extraStyle }) => {
  console.log(extraStyle);
  return (
    <Fragment>
      <img
        src={loading}
        alt='Loading...'
        style={{
          width: '100px',
          margin: 'auto',
          display: 'block',
          ...extraStyle,
        }}
      />
    </Fragment>
  );
};

export default Loading;
