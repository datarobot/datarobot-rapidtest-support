import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

const Home = lazy(() => import('views/Home'));
const Join = lazy(() => import('views/Join'));
const ProgramAdmin = lazy(() => import('views/ProgramAdmin'));
const Other = lazy(() => import('views/Other'));
const Sites = lazy(() => import('views/Sites'));
const Accounts = lazy(() => import('views/Accounts'));

const Routes = () => (
  <Switch>
    <Route path={ROUTES.PROGRAM_ADMIN} component={ProgramAdmin} />
    <Route path={ROUTES.JOIN} component={Join} />
    <Route path={ROUTES.OTHER} component={Other} />
    <Route path={ROUTES.SITES} component={Sites} />
    <Route path={ROUTES.ACCOUNTS} component={Accounts} />
    <Route path={ROUTES.LANDING_PAGE} component={Home} />
  </Switch>
);

export default Routes;
