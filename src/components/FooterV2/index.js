// @ts-nocheck
import pkg from 'package.alias.json';

import './FooterV2.css';

const year = new Date().getFullYear();

const FooterV2 = () => (
  <div className="footer-v2">
    <div className="copy">
      &copy;{year} Rapidtest <small>v{pkg.version}</small>
    </div>
  </div>
);

export default FooterV2;
