// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import Logo from 'components/Logo';
import Nav from 'components/Header/Nav';
import LoginModal from 'components/Modals/LogIn';

import { ROUTES } from 'rt-constants';
import { authenticatedAtom } from 'store';
import { signOut } from 'services/firebase';

import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [authenticated, setAuthenticated] = useAtom(authenticatedAtom);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="header">
        <Link className="logo" to={ROUTES.LANDING_PAGE}>
          <Logo color="#00528D" />
        </Link>

        <Nav />

        <section className="links">
          {authenticated ? (
            <Link
              to={ROUTES.LANDING_PAGE}
              className="login-btn btn-clear mr-2"
              onClick={() => {
                signOut();
                setAuthenticated(false);
                localStorage.setItem('authenticated', false);
              }}
            >
              {t('buttons.signout')}
            </Link>
          ) : (
            <Link to={ROUTES.LOG_IN} className="login-btn btn-clear mr-2">
              {t('buttons.signin')}
            </Link>
          )}
          <button className="btn-primary" type="button">
            {t('buttons.signup')}
          </button>
        </section>
      </div>

      <LoginModal
        showModal={showLoginModal}
        handleClose={() => {
          setShowLoginModal(!showLoginModal);
        }}
      />
    </>
  );
};

export default Header;
