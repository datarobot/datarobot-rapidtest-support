import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';

const ProgramAdminForm = () => {
  const { control, errors, handleSubmit } = useForm();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="w-full mr-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
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
            name="firstName"
            placeholder="First Name"
            onChange={onChange}
            value={value}
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="firstName" />

      <Controller
        name="lastName"
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
            name="lastName"
            placeholder="Last Name"
            onChange={onChange}
            value={value}
            className="mt-2"
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="lastName" />

      <Controller
        name="phone"
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
            name="phone"
            placeholder="Phone Number"
            onChange={onChange}
            value={value}
            className="mt-6"
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="phone" />

      <Controller
        name="email"
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
            name="email"
            placeholder="Email address"
            onChange={onChange}
            value={value}
            className="mt-2"
            isRequired
          />
        )}
      />
      <ErrorMessage errors={errors} errorKey="email" />

      <button type="submit" className="btn-primary mt-6">
        Request Test Admin Account
      </button>
    </form>
  );
};

export default ProgramAdminForm;
