// @ts-nocheck
import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import { getUserRole } from 'utils';

import Unauthorized from 'components/Unauthorized';

const Home = lazy(() => import('views/Home'));
const Join = lazy(() => import('views/Join'));
const Sites = lazy(() => import('views/Sites'));
const AddSite = lazy(() => import('views/Sites/AddSite'));
const EditSite = lazy(() => import('views/Sites/EditSite'));
const RequestSite = lazy(() => import('views/Sites/Request'));
const UploadSites = lazy(() => import('views/Sites/UploadSites'));
const Accounts = lazy(() => import('views/Accounts'));
const AddAccount = lazy(() => import('views/Accounts/AddAccount'));
const EditAccount = lazy(() => import('views/Accounts/EditAccount'));
const RequestAccount = lazy(() => import('views/Accounts/Request'));
const UploadAccounts = lazy(() => import('views/Accounts/UploadAccounts'));
const Faq = lazy(() => import('views/Faq'));
const LogIn = lazy(() => import('views/LogIn'));
const Dashboard = lazy(() => import('views/Dashboard'));
const TrainingMaterials = lazy(() => import('views/TrainingMaterials'));
const SuggestImprovement = lazy(() => import('views/SuggestImprovement'));
const Contact = lazy(() => import('views/Contact'));
const FourOhFour = lazy(() => import('views/404'));

export const PrivateRoute = ({
  component: Component,
  authenticated,
  path,
  roles,
  route,
  ...rest
}) => {
  const authorized = () => {
    if (!route.roles) {
      return true;
    }

    return route.roles.includes(getUserRole(roles));
  };

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        authenticated ? (
          <>{authorized() ? <Component {...props} /> : <Unauthorized />}</>
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOG_IN.path,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const Routes = ({ authenticated, roles }) => (
  <Switch>
    <Route path={ROUTES.JOIN.path} component={Join} />
    <PrivateRoute
      authenticated={authenticated}
      exact
      path={ROUTES.SITES.path}
      route={ROUTES.SITES}
      roles={roles}
      component={Sites}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.ADD_SITE.path}
      route={ROUTES.ADD_SITE}
      roles={roles}
      component={AddSite}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={`${ROUTES.EDIT_SITE.path}/:id`}
      route={ROUTES.EDIT_SITE}
      roles={roles}
      component={EditSite}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.UPLOAD_SITES.path}
      route={ROUTES.UPLOAD_SITES}
      roles={roles}
      component={UploadSites}
    />
    <PrivateRoute
      authenticated={authenticated}
      exact
      path={ROUTES.ACCOUNTS.path}
      route={ROUTES.ACCOUNTS}
      roles={roles}
      component={Accounts}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.ADD_ACCOUNT.path}
      route={ROUTES.ADD_ACCOUNT}
      roles={roles}
      component={AddAccount}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={`${ROUTES.EDIT_ACCOUNT.path}/:id`}
      route={ROUTES.EDIT_ACCOUNT}
      roles={roles}
      component={EditAccount}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.UPLOAD_ACCOUNTS.path}
      route={ROUTES.UPLOAD_ACCOUNTS}
      roles={roles}
      component={UploadAccounts}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.DASHBOARD.path}
      route={ROUTES.DASHBOARD}
      component={Dashboard}
    />
    <Route path={ROUTES.REQUEST_ACCOUNT.path} component={RequestAccount} />
    <Route path={ROUTES.REQUEST_SITE.path} component={RequestSite} />
    <Route path={ROUTES.FAQ.path} component={Faq} />
    <Route
      exact
      path={ROUTES.TRAINING_MATERIALS.path}
      component={TrainingMaterials}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.SUGGEST_IMPROVEMENT.path}
      route={ROUTES.SUGGEST_IMPROVEMENT}
      component={SuggestImprovement}
    />
    <Route exact path={ROUTES.CONTACT.path} component={Contact} />
    <Route exact path={ROUTES.LOG_IN.path} component={LogIn} />
    <Route exact path={ROUTES.LANDING_PAGE.path} component={Home} />
    <Route component={FourOhFour} />
  </Switch>
);
