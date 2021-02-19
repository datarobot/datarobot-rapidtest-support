import React from 'react';
import './Footer.css';

const year = new Date().getFullYear();

const Footer = () => (
  <div className="footer">
    <p>
      &copy;{year} <span className="font-bold ml-1">rapid</span>test
    </p>
    <div className="footer-links flex">
      <p>Link</p>
      <p>Link</p>
      <p>Link</p>
      <p>Link</p>
    </div>
  </div>
);

export default Footer;
