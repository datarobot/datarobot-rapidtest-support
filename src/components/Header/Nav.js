import { NavLink } from 'react-router-dom';

import { ROUTES } from 'rt-constants';

const Nav = () => (
  <ul className="nav">
    <li>
      <NavLink exact className="nav-link" to={ROUTES.SITES}>
        Sites
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.ACCOUNTS}>
        Testers
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.LANDING_PAGE}>
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.FAQ}>
        FAQ
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.LANDING_PAGE}>
        Materials
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.LANDING_PAGE}>
        Board
      </NavLink>
    </li>
  </ul>
);

export default Nav;
