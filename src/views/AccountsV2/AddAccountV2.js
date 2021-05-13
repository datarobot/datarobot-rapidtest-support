// @ts-nocheck
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ErrorMessage from 'components/ErrorMessage';
import InfoBox from 'components/InfoBox';
import Input from 'components/Input';
import PageHeader from 'components/PageHeader';
import { ROUTES } from 'rt-constants';
import { addAccount } from 'services/api';

const AddAccountV2 = ({ history }) => {
  const { control, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    addAccount(data)
      .then(() => {
        toast.success('Success!', {
          onClose: () => {
            history.push(ROUTES.ACCOUNTS_V2.path);
          },
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
      <PageHeader headline="Add New Account" />

      <section className="flex">
        <form className="w-1/2 mr-8" onSubmit={handleSubmit(onSubmit)}>
          <p className="sub-heading text-blue">Personal Info</p>
          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <Input
                    name="first_name"
                    label="First Name"
                    placeholder="First name"
                    onChange={onChange}
                    value={value}
                    isRequired
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="first_name" />
            </div>

            <div className="w-1/2">
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <Input
                    name="last_name"
                    label="Last Name"
                    placeholder="Last name"
                    onChange={onChange}
                    value={value}
                    isRequired
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="last_name" />
            </div>
          </fieldset>

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
                name="email_address"
                label="Email"
                type="email"
                placeholder="Email"
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
                name="phone_number_office"
                label="Phone"
                placeholder="(555) 867-5309"
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

          <div className="btn-row end mt-4">
            <button
              className="btn-clear mr-1"
              onClick={() => history.goBack()}
              type="button"
            >
              Cancel
            </button>
            <button className="btn-primary mr-2" type="submit">
              Save Info
            </button>
          </div>
        </form>

        <div className="w-1/4">
          <InfoBox
            heading="Account Requirements"
            subtext="To create an account, first name, last name, and email are required."
          />
        </div>
      </section>
    </>
  );
};

export default AddAccountV2;
