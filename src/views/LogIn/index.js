// @ts-nocheck
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthContext } from 'components/AuthProvider';
import Button, { KIND } from 'components/Button';
import { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import ProgramList from 'components/ProgramList';
import PageHeader from 'components/PageHeader';

import { app, signIn, getUser, signOut } from 'services/firebase';

import { userAtom } from 'rt-store';
import { get, set, getUserRole, setAccessToken, setRefreshToken } from 'utils';

import { ROUTES, LIVE_PROGRAMS } from 'rt-constants';

const LogIn = ({ location, history }) => {
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
    <>
      <PageHeader
        headline="Log In"
        subtext={
          <p>
            Don't have an account? <Link to={ROUTES.JOIN.path}>Sign up!</Link>
          </p>
        }
      />
      {showLoginMessage ? (
        <div className="w-full pt-24 flex place-content-center">
          <p className="headline">
            We're sorry, only Program Admins can log in at this time.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/5">
          <ProgramList name="state" onChange={handleProgramChange} />

          <ControlledInput
            name="email"
            label="Email address"
            placeholder="you@example.com"
            labelClass="mt-2"
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

          <ControlledInput
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

          <div className="btn-row end">
            <Button
              btnType="submit"
              kind={KIND.PRIMARY}
              className="mt-8"
              label="Log In"
              disabled={!selectedProgram}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default LogIn;
