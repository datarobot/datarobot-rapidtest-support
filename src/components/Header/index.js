// @ts-nocheck
import { useEffect, useState } from 'react';
import cls from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import Logo from 'components/Logo';

import { ROUTES } from 'rt-constants';
import { loginAtom } from 'store';

import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);
  const { pathname } = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => {
    setIsLandingPage(pathname === ROUTES.LANDING_PAGE);

    if (pathname === ROUTES.LANDING_PAGE) {
      document.body.classList.add('isLandingPage');
    } else {
      document.body.classList.remove('isLandingPage');
    }
  }, [pathname]);

  return (
    <div
      className={cls('header', {
        isLandingPage,
      })}
    >
      <Link to="/">
        <Logo className="logo" color={isLandingPage ? '#283542' : '#fff'} />
      </Link>
      <section className="links absolute">
        {loggedIn ? (
          <button
            className="login-btn"
            type="button"
            onClick={() => setLoggedIn(false)}
          >
            {t('buttons.signout')}
          </button>
        ) : (
          <button
            className="login-btn"
            type="button"
            onClick={() => setLoggedIn(true)}
          >
            {t('buttons.signin')}
          </button>
        )}
        <button
          className={cls({
            'btn-outline-primary': isLandingPage,
            'btn-white': !isLandingPage,
          })}
          type="button"
        >
          {t('buttons.signup')}
        </button>
      </section>
    </div>
  );
};

export default Header;
