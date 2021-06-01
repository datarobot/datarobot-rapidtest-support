import { NavLink } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

const Nav = ({ authenticated }) => (
  <ul className="nav">
    {authenticated && (
      <li>
        <NavLink exact className="p-4" to={ROUTES.SITES_V2.path}>
          <h6>Sites</h6>
        </NavLink>
      </li>
    )}
    {authenticated && (
      <li>
        <NavLink exact className="p-4" to={ROUTES.ACCOUNTS_V2.path}>
          <h6>Test Operators</h6>
        </NavLink>
      </li>
    )}
    <li>
      <NavLink exact className="p-4" to={ROUTES.TESTING_GUIDE_LANDING.path}>
        <h6>Testing Guide</h6>
      </NavLink>
    </li>
    <li>
      <NavLink exact className="p-4" to={ROUTES.FAQ_V2_LANDING.path}>
        <h6>FAQ</h6>
      </NavLink>
    </li>
  </ul>
);

export default Nav;
