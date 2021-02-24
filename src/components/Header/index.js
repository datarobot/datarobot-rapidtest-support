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
  const [authenticated] = useAtom(authenticatedAtom);
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
            <button className="login-btn" type="button" onClick={signOut}>
              {t('buttons.signout')}
            </button>
          ) : (
            <button
              className="login-btn"
              type="button"
              onClick={() => setShowLoginModal(true)}
            >
              {t('buttons.signin')}
            </button>
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
