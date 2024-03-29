// @ts-nocheck
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { addAccount } from 'services/api';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import Button from 'components/Button';

const AddAccountV2 = () => {
  const { control, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    addAccount(data)
      .then(() => {
        toast.success('Success!', {
          closeButton: false,
          hideProgressBar: true,
          autoClose: 1500,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <h3 className="mb-2">Add New Account</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="first_name"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              v2
              name="first_name"
              label="First Name"
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
          render={({ onChange, value }) => (
            <Input
              v2
              name="last_name"
              label="Last Name"
              onChange={onChange}
              value={value}
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
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('errorMessages.email.invalid'),
            },
          }}
          render={({ onChange, value }) => (
            <Input
              v2
              name="email_address"
              label="Email"
              type="email"
              onChange={onChange}
              value={value}
              className="mt-2"
              isRequired
            />
          )}
        />
        <ErrorMessage errors={errors} errorKey="first_name" />

        <Controller
          name="phone_number_office"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              v2
              name="phone_number_office"
              label="Phone"
              placeholder="(000) 000-0000"
              mask="(999) 999-9999"
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
              optional
              className="mt-2"
            />
          )}
        />

        <div className="btn-row end mt-4">
          <Button v2 primary small className="w-full" type="submit">
            Save Info
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddAccountV2;
