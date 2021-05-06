// @ts-nocheck
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { app, signIn, getUser, signOut } from 'services/firebase';
import { get, set, getUserRole, setAccessToken, setRefreshToken } from 'utils';
import { userAtom } from 'rt-store';
import { ROUTES, LIVE_PROGRAMS } from 'rt-constants';

import { AuthContext } from 'components/AuthProvider';
import Button, { KIND } from 'components/Button';
import { ControlledInput as Input } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import ProgramList from 'components/ProgramList';

import LayoutV2 from 'components/Layouts/LayoutV2';
import LogoV2 from 'components/LogoV2';

import support from 'assets/images/auth/support.svg';
import './LogInV2.css';

const LogInV2 = ({ location, history }) => {
  const { handleSubmit, register, errors } = useForm();
  const [, setUserInfo] = useAtom(userAtom);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(get('program'));
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);

  const onSubmit = ({ email, password }) => {
    signIn(email, password)
      .then(async (info) => {
        const user = await getUser();

        const { claims } = await getUser();
        const { dashboard_user, proctor_admin, site_admin } = claims;

        setUser({
          ...app[get('program')].auth().currentUser,
          roles: {
            dashboard_user,
            proctor_admin,
            site_admin,
          },
          role: getUserRole({ dashboard_user, proctor_admin, site_admin }),
        });

        if (!dashboard_user || !proctor_admin || !site_admin) {
          setShowLoginMessage(true);
          return signOut();
        }

        setAccessToken(user.token);
        setRefreshToken(info.user.refreshToken);

        setUserInfo(user);
        if (location?.state?.from) {
          history.push(location.state.from);
        } else {
          history.push('/admin');
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 10000 });
      });
  };

  const handleProgramChange = ({ target }) => {
    const { value } = target;
    if (!LIVE_PROGRAMS.includes(value)) {
      toast.info('That program has not been implemented yet.', {
        autoClose: 5000,
      });
      return;
    }
    set('program', value);
    set('api', process.env[`REACT_APP_${value}_SERVER_URL`]);
    setSelectedProgram(value);
    window.location.reload(true);
  };

  return (
    <LayoutV2 hideHeader hideFooter authBackground>
      <div className="LogInV2">
        <Link to={ROUTES.LANDING_PAGE_V2.path} className="logoV2">
          <LogoV2 />
        </Link>
        <div className="formContainer">
          <h2 className="mb-4">Sign In</h2>
          {showLoginMessage ? (
            <div className="w-full pt-24 flex place-content-center">
              <p className="headline">
                We're sorry, only Program Admins can log in at this time.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProgramList
                v2
                name="state"
                label="Your state"
                onChange={handleProgramChange}
              />

              <Input
                v2
                name="email"
                label="Email address"
                placeholder="you@example.com"
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('errorMessages.email.invalid'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="email" />

              <Input
                v2
                label="Password"
                placeholder="••••••••"
                type="password"
                name="password"
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="password" />

              <div className="btn-row">
                <Button
                  v2
                  primary
                  type="submit"
                  kind={KIND.PRIMARY}
                  className="mt-8"
                  label="Sign In"
                  disabled={!selectedProgram}
                />
              </div>
            </form>
          )}
          <p className="mt-4">
            Don't have an account?{' '}
            <Link to={ROUTES.JOIN_V2.path} className="underline">
              Join
            </Link>
          </p>
        </div>
        <div className="contactSupport">
          <img src={support} alt="" />
          <span>If you have any questions</span>
          <a href="mailto:mack.heiser@datarobot.com?subject=rapidtestingapp.org%20Support%20Request">
            Contact support
          </a>
        </div>
      </div>
    </LayoutV2>
  );
};

export default LogInV2;
