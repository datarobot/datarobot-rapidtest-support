// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

import Icon from 'components/Icon';
import Button from 'components/Button';
import LogoV2 from 'components/LogoV2';
import Nav from 'components/HeaderV2/Nav';
import { AuthContext } from 'components/AuthProvider';

import { ROUTES } from 'rt-constants';

import { signOut } from 'services/firebase';

import './HeaderV2.css';

const HeaderV2 = () => {
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
    <div className="rt-header-v2">
      <div className="wrapper">
        <Link className="logo" to={ROUTES.LANDING_PAGE_V2.path}>
          <LogoV2 />
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
                <Icon iconName="sign-out" type="fal" size="lg" />
              </Link>
            </div>
          ) : (
            <>
              <Button v2 outline small>
                <Link to={ROUTES.LOG_IN.path}>{t('buttons.signin')}</Link>
              </Button>

              <Button v2 secondary small>
                <Link to={ROUTES.JOIN.path}>{t('buttons.signup')}</Link>
              </Button>
            </>
          )}
        </section>
      </div>
      <ReactTooltip id="sign-out" effect="solid" />
    </div>
  );
};

export default HeaderV2;
