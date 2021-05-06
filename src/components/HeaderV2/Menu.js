import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'rt-constants';

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
              <NavLink exact className="p-4" to={ROUTES.SITES.path}>
                <h5>Sites</h5>
              </NavLink>
              <hr />
              <NavLink exact className="p-4" to={ROUTES.ACCOUNTS.path}>
                <h5>Accounts</h5>
              </NavLink>
              <hr />
            </>
          )}
          <a
            href={trainingMaterials}
            className="p-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h5>Training Materials</h5>
          </a>
          <hr />
          <NavLink exact className="p-4" to={ROUTES.FAQ.path}>
            <h5>FAQ</h5>
          </NavLink>

          {!authenticated && (
            <>
              <Button v2 primary className="w-full mt-12">
                <Link to={ROUTES.JOIN_V2.path}>{t('buttons.join')}</Link>
              </Button>

              <Button v2 outline className="w-full mt-8">
                <Link to={ROUTES.LOG_IN_V2.path}>{t('buttons.signin')}</Link>
              </Button>
            </>
          )}
        </ReactModal>
      </div>
    </div>
  );
};

export default Menu;
