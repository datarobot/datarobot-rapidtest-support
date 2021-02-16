// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import { loginAtom } from 'store';

import logo from '../../assets/images/logo.svg';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);

  return (
    <div className="header bg-blue flex justify-center items-center">
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <section className="links absolute">
        {loggedIn ? (
          <button
            className="btn-clear text-white"
            type="button"
            onClick={() => setLoggedIn(false)}
          >
            {t('buttons.signout')}
          </button>
        ) : (
          <button
            className="btn-clear text-white"
            type="button"
            onClick={() => setLoggedIn(true)}
          >
            {t('buttons.signin')}
          </button>
        )}
        <button className="btn-white" type="button">
          {t('buttons.signup')}
        </button>
      </section>
    </div>
  );
};

export default Header;
