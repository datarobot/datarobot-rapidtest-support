import { NavLink } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

const Nav = ({ authenticated }) => (
  <ul className="nav">
    {authenticated && (
      <li>
        <NavLink exact className="p-4" to={ROUTES.SITES.path}>
          <h5>Sites</h5>
        </NavLink>
      </li>
    )}
    {authenticated && (
      <li>
        <NavLink exact className="p-4" to={ROUTES.ACCOUNTS.path}>
          <h5>Accounts</h5>
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
        <h5>Training Materials</h5>
      </a>
    </li>
    <li>
      <NavLink exact className="p-4" to={ROUTES.FAQ.path}>
        <h5>FAQ</h5>
      </NavLink>
    </li>
  </ul>
);

export default Nav;
