// @ts-nocheck
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import Logo from 'components/Logo';
import Nav from 'components/Header/Nav';

import { ROUTES } from 'rt-constants';
import { loginAtom } from 'store';

import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);

  return (
    <div className="header">
      <Link className="logo" to={ROUTES.LANDING_PAGE}>
        <Logo color="#00528D" />
      </Link>

      <Nav />

      <section className="links">
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
        <button className="btn-primary" type="button">
          {t('buttons.signup')}
        </button>
      </section>
    </div>
  );
};

export default Header;
