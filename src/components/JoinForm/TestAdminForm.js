import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';

const TestAdminForm = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useForm();
  const { t } = useTranslation();

  return (
    <form className="w-full mr-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="first_name"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: t('errorMessages.common.required'),
          },
        }}
        render={({ onChange, value }) => (
          <Input
            name="first_name"
            placeholder="First Name"
            onChange={onChange}
            value={value}
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="first_name" />

      <Controller
        name="last_name"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: t('errorMessages.common.required'),
          },
        }}
        render={({ onChange, value }) => (
          <Input
            name="last_name"
            placeholder="Last Name"
            onChange={onChange}
            value={value}
            className="mt-2"
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="last_name" />

      <Controller
        name="email_address"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: t('errorMessages.common.required'),
          },
        }}
        render={({ onChange, value }) => (
          <Input
            name="email_address"
            placeholder="Email address"
            onChange={onChange}
            value={value}
            className="mt-6"
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="email_address" />

      <Controller
        name="phone_number_office"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <Input
            name="phone_number_office"
            placeholder="Phone Number"
            onChange={({ target }) => {
              const x = target.value
                .replace(/\D/g, '')
                .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
              // eslint-disable-next-line no-param-reassign
              target.value = !x[2]
                ? x[1]
                : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
              onChange(target.value);
            }}
            value={value}
            className="mt-2"
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="phone_number_office" />

      <button type="submit" className="btn-primary mt-6">
        Request Account
      </button>
    </form>
  );
};

export default TestAdminForm;
