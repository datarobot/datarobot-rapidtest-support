// @ts-nocheck
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Icon from 'components/Icon';
import Logo from 'components/Logo';
import Nav from 'components/Header/Nav';
import { AuthContext } from 'components/AuthProvider';

import { ROUTES } from 'rt-constants';

import { signOut } from 'services/firebase';

import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const { authenticated, user } = useContext(AuthContext);

  return (
    <>
      <div className="header">
        <Link className="logo" to={ROUTES.LANDING_PAGE}>
          <Logo color="#00528D" />
        </Link>

        <Nav />

        <section className="links">
          {authenticated ? (
            <div className="flex items-center">
              <p className="font-bold text-xs">
                {user?.displayName || user?.email}
              </p>
              <Link
                to={ROUTES.LANDING_PAGE}
                className="login-btn btn-clear p-0"
                onClick={() => {
                  signOut();
                }}
              >
                <Icon iconName="sign-out" type="fal" size="lg" />
              </Link>
            </div>
          ) : (
            <>
              <Link to={ROUTES.LOG_IN} className="login-btn btn-clear mr-2">
                {t('buttons.signin')}
              </Link>

              <button className="btn-primary" type="button">
                {t('buttons.signup')}
              </button>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Header;
