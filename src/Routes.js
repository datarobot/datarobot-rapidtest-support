// @ts-nocheck
import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'rt-constants';

const Home = lazy(() => import('views/Home'));
const Join = lazy(() => import('views/Join'));
const ProgramAdmin = lazy(() => import('views/ProgramAdmin'));
const Other = lazy(() => import('views/Other'));
const Sites = lazy(() => import('views/Sites'));
const AddSite = lazy(() => import('views/Sites/AddSite'));
const EditSite = lazy(() => import('views/Sites/EditSite'));
const Accounts = lazy(() => import('views/Accounts'));
const AddAccount = lazy(() => import('views/Accounts/AddAccount'));
const EditAccount = lazy(() => import('views/Accounts/EditAccount'));
const Faq = lazy(() => import('views/Faq'));
const LogIn = lazy(() => import('views/LogIn'));
const Dashboard = lazy(() => import('views/Dashboard'));
const TrainingMaterials = lazy(() => import('views/TrainingMaterials'));

export const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: ROUTES.LOG_IN,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const Routes = ({ authenticated }) => (
  <Switch>
    <Route path={ROUTES.PROGRAM_ADMIN} component={ProgramAdmin} />
    <Route path={ROUTES.JOIN} component={Join} />
    <Route path={ROUTES.OTHER} component={Other} />
    <PrivateRoute
      authenticated={authenticated}
      exact
      path={ROUTES.SITES}
      component={Sites}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.ADD_SITE}
      component={AddSite}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={`${ROUTES.EDIT_SITE}/:id`}
      component={EditSite}
    />
    <PrivateRoute
      authenticated={authenticated}
      exact
      path={ROUTES.ACCOUNTS}
      component={Accounts}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.ADD_ACCOUNT}
      component={AddAccount}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={`${ROUTES.EDIT_ACCOUNT}/:id`}
      component={EditAccount}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.DASHBOARD}
      component={Dashboard}
    />
    <Route path={ROUTES.FAQ} component={Faq} />
    <Route path={ROUTES.TRAINING_MATERIALS} component={TrainingMaterials} />
    <Route exact path={ROUTES.LANDING_PAGE} component={Home} />
    <Route exact path={ROUTES.LOG_IN} component={LogIn} />
  </Switch>
);
