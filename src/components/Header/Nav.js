import { Link } from 'react-router-dom';

import { ROUTES } from 'rt-constants';

const Nav = () => (
  <ul className="nav">
    <li>
      <Link className="nav-link" to={ROUTES.SITES}>
        Sites
      </Link>
    </li>
    <li>
      <Link className="nav-link" to={ROUTES.ACCOUNTS}>
        Testers
      </Link>
    </li>
    <li>
      <Link className="nav-link" to={ROUTES.LANDING_PAGE}>
        Dashboard
      </Link>
    </li>
    <li>
      <Link className="nav-link" to={ROUTES.LANDING_PAGE}>
        FAQ
      </Link>
    </li>
    <li>
      <Link className="nav-link" to={ROUTES.LANDING_PAGE}>
        Materials
      </Link>
    </li>
    <li>
      <Link className="nav-link" to={ROUTES.LANDING_PAGE}>
        Board
      </Link>
    </li>
  </ul>
);

export default Nav;
