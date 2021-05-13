// @ts-nocheck
import cls from 'classnames';
import pkg from 'package.alias.json';

import './FooterV2.css';

const year = new Date().getFullYear();

const FooterV2 = ({ footerFixed }) => (
  <div className={cls('footer-v2', { footerFixed })}>
    <div className="wrapper">
      <div className="copy">
        &copy;{year} Rapidtest <small>v{pkg.version}</small>
      </div>
    </div>
  </div>
);

export default FooterV2;
