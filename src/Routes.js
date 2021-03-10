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
const RequestSite = lazy(() => import('views/Sites/Request'));
const UploadSites = lazy(() => import('views/Sites/UploadSites'));
const Accounts = lazy(() => import('views/Accounts'));
const AddAccount = lazy(() => import('views/Accounts/AddAccount'));
const EditAccount = lazy(() => import('views/Accounts/EditAccount'));
const RequestAccount = lazy(() => import('views/Accounts/Request'));
const UploadAccounts = lazy(() => import('views/Accounts/UploadAccounts'));
const Faq = lazy(() => import('views/Faq'));
const LogIn = lazy(() => import('views/LogIn'));
const SignUp = lazy(() => import('views/SignUp'));
const Dashboard = lazy(() => import('views/Dashboard'));
const TrainingMaterials = lazy(() => import('views/TrainingMaterials'));
const SuggestImprovement = lazy(() => import('views/SuggestImprovement'));
const Contact = lazy(() => import('views/Contact'));
const FourOhFour = lazy(() => import('views/404'));

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
      path={ROUTES.UPLOAD_SITES}
      component={UploadSites}
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
      path={ROUTES.UPLOAD_ACCOUNTS}
      component={UploadAccounts}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.DASHBOARD}
      component={Dashboard}
    />
    <Route path={ROUTES.REQUEST_ACCOUNT} component={RequestAccount} />
    <Route path={ROUTES.REQUEST_SITE} component={RequestSite} />
    <Route path={ROUTES.FAQ} component={Faq} />
    <Route
      exact
      path={ROUTES.TRAINING_MATERIALS}
      component={TrainingMaterials}
    />
    <PrivateRoute
      authenticated={authenticated}
      path={ROUTES.SUGGEST_IMPROVEMENT}
      component={SuggestImprovement}
    />
    <Route exact path={ROUTES.CONTACT} component={Contact} />
    <Route exact path={ROUTES.LOG_IN} component={LogIn} />
    <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
    <Route exact path={ROUTES.LANDING_PAGE} component={Home} />
    <Route component={FourOhFour} />
  </Switch>
);
