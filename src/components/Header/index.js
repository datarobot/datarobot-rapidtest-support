// @ts-nocheck
import React from 'react';
import { useAtom } from 'jotai';

import loginAtom from 'store';

import logo from '../../assets/images/logo.svg';
import './Header.css';

const Header = () => {
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);

  return (
    <div className="header bg-blue flex justify-center items-center">
      <img src={logo} className="logo" alt="logo" />

      <section className="links absolute">
        {loggedIn ? (
          <button
            className="text-white font-bold focus:outline-none"
            type="button"
            onClick={() => setLoggedIn(false)}
          >
            Log out
          </button>
        ) : (
          <button
            className="text-white font-bold focus:outline-none"
            type="button"
            onClick={() => setLoggedIn(true)}
          >
            Login
          </button>
        )}
        <button
          className="text-blue font-bold bg-white px-4 py-2 rounded"
          type="button"
        >
          Join
        </button>
      </section>
    </div>
  );
};

export default Header;
