import { NavLink } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

const Nav = () => (
  <ul className="nav">
    <li>
      <NavLink exact className="nav-link" to={ROUTES.SITES.path}>
        Sites
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.ACCOUNTS.path}>
        Testers
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.ADMIN.path}>
        Program Admin
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.FAQ.path}>
        FAQ
      </NavLink>
    </li>
    <li>
      <a
        href={trainingMaterials}
        className="nav-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Training Materials
      </a>
    </li>
  </ul>
);

export default Nav;
