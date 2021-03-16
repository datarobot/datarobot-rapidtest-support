// @ts-nocheck
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button, { KIND } from 'components/Button';
import { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';

import { signIn, getUser } from 'services/firebase';
import { userAtom } from 'store';
import { setAccessToken, setRefreshToken } from 'utils';

import { ROUTES } from 'rt-constants';

const LogIn = ({ location, history }) => {
  const { handleSubmit, register, errors } = useForm();
  const [, setUserInfo] = useAtom(userAtom);
  const { t } = useTranslation();

  const onSubmit = ({ email, password }) => {
    signIn(email, password)
      .then(async (info) => {
        const user = await getUser();

        setAccessToken(user.token);
        setRefreshToken(info.user.refreshToken);

        setUserInfo(info);
        if (location?.state?.from) {
          history.push(location.state.from);
        } else {
          history.push('/');
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 10000 });
      });
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/5">
        <ControlledInput
          name="email"
          label="Email address"
          placeholder="you@example.com"
          labelClass="mt-0"
          autoFocus
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
          />
        </div>
      </form>
    </>
  );
};

export default LogIn;
