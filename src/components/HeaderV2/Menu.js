import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'rt-constants';
import { signOut } from 'services/firebase';

import Button from 'components/Button';

import bars from 'assets/images/bars.svg';
import close from 'assets/images/close.svg';
import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

import './Menu.css';

const Menu = ({ authenticated }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {
    setIsOpen(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  ReactModal.setAppElement('body');

  return (
    <div className="Menu">
      <div className="menuButton">
        {isOpen ? (
          <img src={close} alt="close menu" onClick={closeMenu} />
        ) : (
          <img src={bars} alt="open menu" onClick={openMenu} />
        )}
        <ReactModal
          isOpen={isOpen}
          onRequestClose={closeMenu}
          overlayClassName="menuModalOverlay"
          className="menuModalContent"
        >
          {authenticated && (
            <>
              <NavLink
                exact
                className="p-4"
                to={ROUTES.SITES_V2.path}
                onClick={() => {
                  closeMenu();
                }}
              >
                <h5>Sites</h5>
              </NavLink>
              <hr />
              <NavLink
                exact
                className="p-4"
                to={ROUTES.ACCOUNTS_V2.path}
                onClick={() => {
                  closeMenu();
                }}
              >
                <h5>Test Operators</h5>
              </NavLink>
              <hr />
              <NavLink
                exact
                className="p-4"
                to={ROUTES.ADMIN_V2.path}
                onClick={() => {
                  closeMenu();
                }}
              >
                <h5>Program Admin</h5>
              </NavLink>
              <hr />
            </>
          )}
          <a
            href={trainingMaterials}
            className="p-4"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              closeMenu();
            }}
          >
            <h5>Training Materials</h5>
          </a>
          <hr />
          <NavLink
            exact
            className="p-4"
            to={ROUTES.FAQ_V2_LANDING.path}
            onClick={() => {
              closeMenu();
            }}
          >
            <h5>FAQ</h5>
          </NavLink>

          {authenticated ? (
            <>
              <Link
                to={ROUTES.LANDING_PAGE_V2.path}
                onClick={() => {
                  closeMenu();
                  signOut();
                }}
              >
                <Button v2 primary className="w-full mt-12">
                  {t('buttons.signout')}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.JOIN_V2.path}
                onClick={() => {
                  closeMenu();
                }}
              >
                <Button v2 primary className="w-full mt-12">
                  {t('buttons.join')}
                </Button>
              </Link>

              <Link
                to={ROUTES.LOG_IN_V2.path}
                onClick={() => {
                  closeMenu();
                }}
              >
                <Button v2 outline className="w-full mt-8">
                  {t('buttons.signin')}
                </Button>
              </Link>
            </>
          )}
        </ReactModal>
      </div>
    </div>
  );
};

export default Menu;
