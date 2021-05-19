// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useResponsive } from 'hooks';

import Icon from 'components/Icon';
import Button from 'components/Button';
import LogoV2 from 'components/LogoV2';
import Nav from 'components/HeaderV2/Nav';
import Menu from 'components/HeaderV2/Menu';
import { AuthContext } from 'components/AuthProvider';

import { ROUTES } from 'rt-constants';

import { signOut } from 'services/firebase';

import './HeaderV2.css';

const HeaderV2 = () => {
  const { t } = useTranslation();
  const { authenticated, user } = useContext(AuthContext);

  const { isTabletOrMobile } = useResponsive();

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

        {isTabletOrMobile ? (
          <section className="links">
            <Menu authenticated={authenticated} />
          </section>
        ) : (
          <>
            <Nav authenticated={authenticated} />

            <section className="links">
              {authenticated ? (
                <div className="flex items-center justify-end">
                  <span className="mr-3">
                    <Link to={ROUTES.ADMIN_V2.path}>
                      <h5>{user?.displayName || user?.email}</h5>
                      {roleType && <h6>{roleType}</h6>}
                    </Link>
                  </span>
                  <Link
                    to={ROUTES.LANDING_PAGE_V2.path}
                    className="logout-btn inline-block"
                    onClick={() => {
                      signOut();
                    }}
                    title="Sign Out"
                  >
                    <Icon iconName="sign-out" type="fal" size="lg" />
                  </Link>
                </div>
              ) : (
                <>
                  <Link to={ROUTES.LOG_IN_V2.path}>
                    <Button v2 outline small>
                      {t('buttons.signin')}
                    </Button>
                  </Link>

                  <Link to={ROUTES.JOIN_V2.path}>
                    <Button v2 secondary small>
                      {t('buttons.join')}
                    </Button>
                  </Link>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderV2;
