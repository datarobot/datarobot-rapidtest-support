import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('views/Home'));
const ProgramAdmin = lazy(() => import('views/ProgramAdmin'));
const Other = lazy(() => import('views/Other'));
const Sites = lazy(() => import('views/Sites'));
const Accounts = lazy(() => import('views/Accounts'));

const Routes = () => (
  <Switch>
    <Route path="/program-admin" component={ProgramAdmin} />
    <Route path="/other" component={Other} />
    <Route path="/sites" component={Sites} />
    <Route path="/accounts" component={Accounts} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;
