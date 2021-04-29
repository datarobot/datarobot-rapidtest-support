import { NavLink } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import trainingMaterials from 'assets/static/TrainingMaterials.pdf';

const Nav = () => (
  <ul className="nav">
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
