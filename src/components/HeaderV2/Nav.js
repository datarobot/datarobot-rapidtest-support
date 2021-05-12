import { NavLink } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

const Nav = ({ authenticated }) => (
  <ul className="nav">
    {authenticated && (
      <li>
        <NavLink exact className="p-4" to={ROUTES.SITES.path}>
          <h6>Sites</h6>
        </NavLink>
      </li>
    )}
    {authenticated && (
      <li>
        <NavLink exact className="p-4" to={ROUTES.ACCOUNTS.path}>
          <h6>Test Operators</h6>
        </NavLink>
      </li>
    )}
    <li>
      <a
        href={trainingMaterials}
        className="p-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h6>Training Materials</h6>
      </a>
    </li>
    <li>
      <NavLink exact className="p-4" to={ROUTES.FAQ_V2_LANDING.path}>
        <h6>FAQ</h6>
      </NavLink>
    </li>
  </ul>
);

export default Nav;
