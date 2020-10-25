import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      Kyaw Zin Hein &#169;{new Date().getFullYear()}. All Rights Reserved.
    </div>
  );
};

export default Footer;
