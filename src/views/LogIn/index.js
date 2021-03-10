// @ts-nocheck
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';

import { signIn, getUser } from 'services/firebase';
import { userAtom } from 'store';

const LogIn = ({ location, history }) => {
  const { handleSubmit, register, errors } = useForm();
  const [, setUserInfo] = useAtom(userAtom);
  const { t } = useTranslation();

  const onSubmit = ({ email, password }) => {
    signIn(email, password)
      .then(async (info) => {
        const user = await getUser();

        localStorage.setItem('token', user.token);

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
      <PageHeader headline="Log In" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/5">
        <ControlledInput
          name="email"
          label="Email address"
          placeholder="you@example.com"
          labelClass="mt-0"
          isRequired
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
          placeholder="Shhhh..."
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
          <button type="submit" className="btn-primary mt-8">
            Log In
          </button>
        </div>
      </form>
    </>
  );
};

export default LogIn;
