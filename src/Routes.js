// @ts-nocheck
import React, { lazy, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'rt-constants';
import { getUserRole } from 'utils';

import NullLayout from 'components/Layouts/NullLayout';
import LayoutV1 from 'components/Layouts/LayoutV1';
import LayoutV2 from 'components/Layouts/LayoutV2';
import Unauthorized from 'components/Unauthorized';
import { AuthContext } from 'components/AuthProvider';
import Loading from 'components/Loading';

const Home = lazy(() => import('views/Home'));
const HomeV2 = lazy(() => import('views/HomeV2'));
const Admin = lazy(() => import('views/Admin'));
const Join = lazy(() => import('views/Join'));
const JoinV2 = lazy(() => import('views/JoinV2'));
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
const FaqV2 = lazy(() => import('views/FaqV2'));
const LogIn = lazy(() => import('views/LogIn'));
const LogInV2 = lazy(() => import('views/LogInV2'));
const Dashboard = lazy(() => import('views/Dashboard'));
const TrainingMaterials = lazy(() => import('views/TrainingMaterials'));
const SuggestImprovement = lazy(() => import('views/SuggestImprovement'));
const Contact = lazy(() => import('views/Contact'));
const FourOhFour = lazy(() => import('views/404'));

export const PublicRoute = ({ layout: Layout = LayoutV1, ...route }) => (
  <Layout>
    <Route {...route} />
  </Layout>
);

const PrivateRoute = ({
  layout: Layout = LayoutV1,
  component: Component,
  auth: { authenticated, user },
  roles,
  ...route
}) => {
  const authorized = roles ? roles.includes(getUserRole(user?.roles)) : true;

  return (
    <Layout>
      <Route
        {...route}
        render={(props) =>
          authenticated ? (
            authorized ? (
              <Component {...props} />
            ) : (
              <Unauthorized />
            )
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
  const { loadingAuthState, ...auth } = useContext(AuthContext);

  return loadingAuthState ? (
    <Loading color="#00528D" size={256} containerClassName="full-height" />
  ) : (
    <Switch>
      <PublicRoute exact {...ROUTES.LANDING_PAGE} component={Home} />
      <PublicRoute
        exact
        {...ROUTES.LANDING_PAGE_V2}
        component={HomeV2}
        layout={NullLayout}
      />
      <PublicRoute exact {...ROUTES.LOG_IN} component={LogIn} />
      <PublicRoute
        exact
        {...ROUTES.LOG_IN_V2}
        component={LogInV2}
        layout={NullLayout}
      />
      <PublicRoute {...ROUTES.JOIN} component={Join} />
      <PublicRoute {...ROUTES.JOIN_V2} component={JoinV2} layout={NullLayout} />
      <PublicRoute {...ROUTES.FAQ} component={Faq} />
      <PublicRoute {...ROUTES.FAQ_V2} component={FaqV2} layout={LayoutV2} />
      <PublicRoute
        exact
        {...ROUTES.TRAINING_MATERIALS}
        component={TrainingMaterials}
      />
      <PublicRoute
        exact
        {...ROUTES.TRAINING_MATERIALS_V2}
        component={TrainingMaterials}
        layout={LayoutV2}
      />
      <PublicRoute exact {...ROUTES.CONTACT} component={Contact} />
      <PublicRoute
        exact
        {...ROUTES.CONTACT_V2}
        component={Contact}
        layout={LayoutV2}
      />
      <PublicRoute {...ROUTES.REQUEST_ACCOUNT} component={RequestAccount} />
      <PublicRoute
        {...ROUTES.REQUEST_ACCOUNT_V2}
        component={RequestAccount}
        layout={LayoutV2}
      />
      <PrivateRoute auth={auth} exact {...ROUTES.SITES} component={Sites} />
      <PrivateRoute
        auth={auth}
        exact
        {...ROUTES.SITES_V2}
        component={Sites}
        layout={LayoutV2}
      />
      <PrivateRoute auth={auth} exact {...ROUTES.ADMIN} component={Admin} />
      <PrivateRoute
        auth={auth}
        exact
        {...ROUTES.ADMIN_V2}
        component={Admin}
        layout={LayoutV2}
      />
      <PrivateRoute auth={auth} {...ROUTES.ADD_SITE} component={AddSite} />
      <PrivateRoute
        auth={auth}
        {...ROUTES.ADD_SITE_V2}
        component={AddSite}
        layout={LayoutV2}
      />
      <PrivateRoute auth={auth} {...ROUTES.EDIT_SITE} component={EditSite} />
      <PrivateRoute
        auth={auth}
        {...ROUTES.EDIT_SITE_V2}
        component={EditSite}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.UPLOAD_SITES}
        component={UploadSites}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.UPLOAD_SITES_V2}
        component={UploadSites}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        exact
        {...ROUTES.ACCOUNTS}
        component={Accounts}
      />
      <PrivateRoute
        auth={auth}
        exact
        {...ROUTES.ACCOUNTS_V2}
        component={Accounts}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.ADD_ACCOUNT}
        component={AddAccount}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.ADD_ACCOUNT_V2}
        component={AddAccount}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.EDIT_ACCOUNT}
        component={EditAccount}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.EDIT_ACCOUNT_V2}
        component={EditAccount}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.UPLOAD_ACCOUNTS}
        component={UploadAccounts}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.UPLOAD_ACCOUNTS_V2}
        component={UploadAccounts}
        layout={LayoutV2}
      />
      <PrivateRoute auth={auth} {...ROUTES.DASHBOARD} component={Dashboard} />
      <PrivateRoute
        auth={auth}
        {...ROUTES.DASHBOARD_V2}
        component={Dashboard}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.REQUEST_SITE}
        component={RequestSite}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.REQUEST_SITE_V2}
        component={RequestSite}
        layout={LayoutV2}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.SUGGEST_IMPROVEMENT}
        component={SuggestImprovement}
      />
      <PrivateRoute
        auth={auth}
        {...ROUTES.SUGGEST_IMPROVEMENT_V2}
        component={SuggestImprovement}
        layout={LayoutV2}
      />
      <PublicRoute component={FourOhFour} />
    </Switch>
  );
};
