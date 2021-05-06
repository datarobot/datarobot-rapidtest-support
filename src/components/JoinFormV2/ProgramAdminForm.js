import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import Button from 'components/Button';

const ProgramAdminForm = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useForm();
  const { t } = useTranslation();

  return (
    <form className="w-full mt-0" onSubmit={handleSubmit(onSubmit)}>
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
            v2
            name="first_name"
            label="First Name"
            placeholder="First Name"
            onChange={onChange}
            value={value}
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="firstName" />

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
            v2
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            onChange={onChange}
            value={value}
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="lastName" />

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
            v2
            name="email_address"
            label="Email address"
            placeholder="Email address"
            onChange={onChange}
            value={value}
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="email" />

      <Controller
        name="phone_number_office"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <Input
            v2
            name="phone_number_office"
            label="Phone Number"
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
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="phone" />

      <Button v2 primary type="submit" className="btn-primary mt-6">
        Request Account
      </Button>
    </form>
  );
};

export default ProgramAdminForm;
