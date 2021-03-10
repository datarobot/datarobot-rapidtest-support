// @ts-nocheck
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';

const SignUp = () => {
  const { handleSubmit, errors, register, watch } = useForm();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Your request was submitted successfully.');
  };

  return (
    <div>
      <PageHeader
        headline="Sign Up"
        subtext={
          <div>
            Sign up for your{' '}
            <span className="text-blue">
              <strong>rapid</strong>test
            </span>{' '}
            account!
          </div>
        }
      />
      <form
        className="w-2/5 bg-blue-lightest py-4 px-8 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name="email"
          label="Email address"
          placeholder="you@example.com"
          labelClass="mt-0"
          isRequired
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
          name="password"
          label="Password"
          type="password"
          isRequired
          ref={register({
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
            minLength: {
              value: 8,
              message: t('errorMessages.password.invalid'),
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
              message: t('errorMessages.password.invalidPattern'),
            },
          })}
        />
        <ErrorMessage errors={errors} errorKey="password" />

        <ControlledInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          isRequired
          ref={register({
            required: {
              value: true,
              message: t('errorMessages.passwordConfirmation.blank'),
            },
            value: (value) =>
              value === watch('password') ||
              t('errorMessages.passwordConfirmation.noMatch'),
          })}
        />
        <ErrorMessage errors={errors} errorKey="confirmPassword" />

        <div className="btn-row end mt-4">
          <button className="btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
