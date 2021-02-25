import { NavLink } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

import trainingMaterials from 'static/TrainingMaterials.pdf';

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
      <NavLink exact className="nav-link" to={ROUTES.DASHBOARD}>
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink exact className="nav-link" to={ROUTES.FAQ}>
        FAQ
      </NavLink>
    </li>
    <li>
      <a href={trainingMaterials} className="nav-link">
        Training Materials
      </a>
    </li>
    {/* <li>
      <NavLink exact className="nav-link" to={ROUTES.LANDING_PAGE}>
        Board
      </NavLink>
    </li> */}
  </ul>
);

export default Nav;
