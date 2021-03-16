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
      <div className="rt-header">
        <Link className="logo" to={ROUTES.LANDING_PAGE.path}>
          <Logo color="#00528D" />
        </Link>

        <Nav />

        <section className="links">
          {authenticated ? (
            <div className="flex items-center justify-end">
              <p className="font-bold text-xs mr-3">
                {user?.displayName || user?.email}
              </p>
              <Link
                to={ROUTES.LANDING_PAGE.path}
                className="logout-btn inline-block -mb-1"
                onClick={() => {
                  signOut();
                }}
              >
                <Icon iconName="sign-out" type="fal" size="lg" />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={ROUTES.LOG_IN.path}
                className="login-btn btn-clear mr-2"
              >
                {t('buttons.signin')}
              </Link>

              <Link to={ROUTES.JOIN.path} className="btn-primary py-3">
                {t('buttons.signup')}
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Header;
