import { lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('views/Home'));
const ProgramAdmin = lazy(() => import('views/ProgramAdmin'));
const Sites = lazy(() => import('views/Sites'));
const Accounts = lazy(() => import('views/Accounts'));

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/program-admin" component={ProgramAdmin} />
      <Route path="/sites" component={Sites} />
      <Route path="/accounts" component={Accounts} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
