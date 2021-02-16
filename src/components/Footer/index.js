import React from 'react';
import './Footer.css';

const year = new Date().getFullYear();

const Footer = () => (
  <div className="footer bg-blue text-white flex justify-between items-center fixed bottom-0 left-0 right-0">
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
