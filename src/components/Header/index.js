import React from 'react';

import logo from '../../assets/images/logo.svg';

import './Header.css';

const Header = () => (
  <div className="header bg-blue flex justify-center items-center">
    <img src={logo} className="logo" alt="logo" />

    <section className="links absolute">
      <button className="text-white font-bold" type="button">
        Login
      </button>
      <button
        className="text-blue font-bold bg-white px-4 py-2 rounded"
        type="button"
      >
        Join
      </button>
    </section>
  </div>
);

export default Header;
