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

export const LoggedInRoutes = () => (
  <Switch>
    <Route path={ROUTES.PROGRAM_ADMIN} component={ProgramAdmin} />
    <Route path={ROUTES.JOIN} component={Join} />
    <Route path={ROUTES.OTHER} component={Other} />
    <Route exact path={ROUTES.SITES} component={Sites} />
    <Route path={ROUTES.ADD_SITE} component={AddSite} />
    <Route path={ROUTES.EDIT_SITE} component={EditSite} />
    <Route exact path={ROUTES.ACCOUNTS} component={Accounts} />
    <Route path={ROUTES.ADD_ACCOUNT} component={AddAccount} />
    <Route path={ROUTES.EDIT_ACCOUNT} component={EditAccount} />
    <Route path={ROUTES.FAQ} component={Faq} />
    <Route exact path={ROUTES.LANDING_PAGE} component={Home} />
  </Switch>
);

export const LoggedOutRoutes = () => (
  <Switch>
    <Route path={ROUTES.JOIN} component={Join} />
    <Route path={ROUTES.OTHER} component={Other} />
    <Route path={ROUTES.FAQ} component={Faq} />
    <Route path={ROUTES.LANDING_PAGE} component={Home} />
  </Switch>
);

export const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: ROUTES.LANDING_PAGE,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const PublicRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === false ? (
        <Component {...props} />
      ) : (
        <Redirect to={ROUTES.LANDING_PAGE} />
      )
    }
  />
);
