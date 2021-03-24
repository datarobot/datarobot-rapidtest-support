// @ts-nocheck
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import StaticContainer from 'components/StaticContainer';

import './Faq.css';

const Faq = () => {
  const { path, url } = useRouteMatch();

  return (
    <section className="flex relative mb-8">
      <aside className="faq-sidebar">
        <NavLink className="nav-link" to={`${url}/general`}>
          General FAQs
        </NavLink>
        <NavLink className="nav-link" to={`${url}/program`}>
          Program Admin FAQs
        </NavLink>
        <NavLink className="nav-link" to={`${url}/test`}>
          Test Operator FAQs
        </NavLink>
      </aside>
      <section className="faq-content">
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${path}/general`} />
          </Route>
          <Route path={`${path}/:id`}>
            <StaticContainer headline="FAQ" />
          </Route>
        </Switch>
      </section>
    </section>
  );
};

export default Faq;
