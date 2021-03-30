// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cls from 'classnames';
import pkg from 'package.alias.json';

import { ROUTES } from 'rt-constants';

import './Footer.css';

const year = new Date().getFullYear();

const Footer = () => {
  const location = useLocation();
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    if (
      location.pathname === '/accounts' ||
      location.pathname === '/sites' ||
      location.pathname === '/'
    ) {
      return setIsTableView(true);
    }

    setIsTableView(false);
  }, [location]);

  return (
    <div className={cls('footer', { 'fixed bottom-0': isTableView })}>
      <p>
        &copy;{year} <span className="font-bold ml-1">rapid</span>test{' '}
        <small>v{pkg.version}</small>
      </p>
      <div className="footer-links flex">
        <Link to={ROUTES.CONTACT.path} className="text-gray-500 no-underline">
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default Footer;
