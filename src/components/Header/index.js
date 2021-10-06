// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

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
  const [roleType, setRoleType] = useState('');

  useEffect(() => {
    const role = user?.role;

    if (role?.includes('dashboard')) {
      return setRoleType('Program Admin');
    }

    if (role?.includes('site')) {
      return setRoleType('Site Admin');
    }

    if (role?.includes('proctor')) {
      return setRoleType('Proctor Admin');
    }
  }, [user]);

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
              <span className="mr-3">
                <p className="font-bold text-xs">
                  {user?.displayName || user?.email}
                </p>
                {roleType && (
                  <p className="text-gray-500 text-xs">{roleType}</p>
                )}
              </span>
              <Link
                to={ROUTES.LANDING_PAGE.path}
                className="logout-btn inline-block -mb-1"
                onClick={() => {
                  signOut();
                }}
                data-tip="Sign Out"
                data-for="sign-out"
              >
                <Icon iconName={faSignOutAlt} size="lg" />
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
      <ReactTooltip id="sign-out" effect="solid" />
    </>
  );
};

export default Header;
