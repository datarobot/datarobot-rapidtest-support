// @ts-nocheck
import React, { lazy, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import { getUserRole } from 'utils';

import LayoutV1 from 'components/Layouts/LayoutV1';
import Unauthorized from 'components/Unauthorized';
import { AuthContext } from 'components/AuthProvider';
import Loading from 'components/Loading';

const Home = lazy(() => import('views/Home'));
const Admin = lazy(() => import('views/Admin'));
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

export const PublicRoute = ({ layout: Layout = LayoutV1, ...props }) => (
  <Layout>
    <Route {...props} />
  </Layout>
);

const PrivateRoute = ({
  layout: Layout = LayoutV1,
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
    <Layout>
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
    </Layout>
  );
};

export const Routes = () => {
  const { authenticated, loadingAuthState, user } = useContext(AuthContext);
  const roles = user?.roles;

  return loadingAuthState ? (
    <LayoutV1>
      <Loading color="#00528D" size={256} containerClassName="full-height" />
    </LayoutV1>
  ) : (
    <Switch>
      <PublicRoute path={ROUTES.JOIN.path} component={Join} />
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
        exact
        path={ROUTES.ADMIN.path}
        route={ROUTES.ADMIN}
        roles={roles}
        component={Admin}
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
        roles={roles}
        component={Dashboard}
      />
      <PublicRoute
        path={ROUTES.REQUEST_ACCOUNT.path}
        component={RequestAccount}
      />
      <PrivateRoute
        authenticated={authenticated}
        path={ROUTES.REQUEST_SITE.path}
        route={ROUTES.REQUEST_SITE}
        roles={roles}
        component={RequestSite}
      />
      <PublicRoute path={ROUTES.FAQ.path} component={Faq} />
      <PublicRoute
        exact
        path={ROUTES.TRAINING_MATERIALS.path}
        component={TrainingMaterials}
      />
      <PrivateRoute
        authenticated={authenticated}
        path={ROUTES.SUGGEST_IMPROVEMENT.path}
        route={ROUTES.SUGGEST_IMPROVEMENT}
        roles={roles}
        component={SuggestImprovement}
      />
      <PublicRoute exact path={ROUTES.CONTACT.path} component={Contact} />
      <PublicRoute exact path={ROUTES.LOG_IN.path} component={LogIn} />
      <PublicRoute exact path={ROUTES.LANDING_PAGE.path} component={Home} />
      <PublicRoute component={FourOhFour} />
    </Switch>
  );
};
