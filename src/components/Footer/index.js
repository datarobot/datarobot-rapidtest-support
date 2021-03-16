import { Link } from 'react-router-dom';

import { ROUTES } from 'rt-constants';

import './Footer.css';

const year = new Date().getFullYear();

const Footer = () => (
  <div className="footer">
    <p>
      &copy;{year} <span className="font-bold ml-1">rapid</span>test
    </p>
    <div className="footer-links flex">
      <Link to={ROUTES.CONTACT.path} className="text-gray-500 no-underline">
        Support
      </Link>
    </div>
  </div>
);

export default Footer;
