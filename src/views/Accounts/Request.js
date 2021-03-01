// @ts-nocheck
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Input, { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';

import { STATE_OPTIONS_FULL } from 'rt-constants';

const RequestAccount = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { handleSubmit, errors, register, control } = useForm();
  const { t } = useTranslation();
  const onSubmit = (data) => {
    console.log(data);
    setShowSuccessMsg(true);
  };

  return (
    <>
      <PageHeader headline="Request an account" />
      <section className="flex">
        <form className="w-2/5 mr-8" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="state"
            label="State"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange, value, ref }) => (
              <Select
                name="state"
                label="State"
                options={STATE_OPTIONS_FULL}
                isRequired
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="state" />

          <ControlledInput
            name="first_name"
            label="First name"
            placeholder="John/Jane"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="first_name" />

          <ControlledInput
            name="last_name"
            label="Last name"
            placeholder="Doe"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="last_name" />

          <ControlledInput
            name="email_address"
            placeholder="contact@example.com"
            label="Email address"
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
          <ErrorMessage errors={errors} errorKey="email_address" />

          <Controller
            control={control}
            name="phone_number_office"
            label="Phone number"
            defaultValue=""
            // eslint-disable-next-line no-unused-vars
            render={({ onChange, value }) => (
              <Input
                name="phone_number_office"
                label="Phone number"
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
              />
            )}
          />

          <div className="btn-row mt-4">
            <button className="btn-primary mr-2" type="submit">
              Save Info
            </button>

            <button className="btn-clear" type="button" onClick={() => {}}>
              Cancel
            </button>
          </div>
        </form>

        <section className="w-3/5 flex justify-center items-center">
          {showSuccessMsg && (
            <p className="sub-heading text-blue">
              Thanks for submitting your request! 🥳
            </p>
          )}
        </section>
      </section>
    </>
  );
};

export default RequestAccount;
