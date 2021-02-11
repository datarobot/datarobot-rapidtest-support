import React from 'react';

import logo from '../../assets/images/logo.svg';

import './Header.css';

const Header = () => (
  <div className="header bg-blue flex justify-center items-center">
    <img src={logo} className="logo" alt="logo" />
  </div>
);

export default Header;
