// @ts-nocheck
import { useState } from 'react';
import cls from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import InfoBox from 'components/InfoBox';
import Input, { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';

import { STATE_OPTIONS_FULL } from 'rt-constants';

import './Accounts.css';

const RequestAccount = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { handleSubmit, errors, register, control } = useForm({
    defaultValues: {},
  });
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Your request was submitted successfully.');
    setShowSuccessMsg(true);
  };

  return (
    <>
      <PageHeader headline="Request an account" />
      <section className="flex mb-4">
        <form
          className={cls('w-full', { isSuccess: showSuccessMsg })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="sub-heading text-blue mb-2">What program are you in?</p>

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
            render={({ onChange, value }) => (
              <Select
                name="state"
                placeholder="Select a program"
                options={STATE_OPTIONS_FULL}
                isRequired
                onChange={(e) => {
                  onChange(e);
                }}
                value={value}
                className="w-2/5"
                showToggle
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="state" />

          <p className="sub-heading text-blue mb-2 mt-8">Personal Info</p>

          <div className="form-grid">
            <fieldset
              className={cls('bg-blue-lightest p-8 mr-4 form', {
                // 'col-span-2': !showSuccessMsg,
              })}
            >
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

              <div className="btn-row end mt-4">
                <button className="btn-clear" type="button" onClick={() => {}}>
                  Cancel
                </button>

                <button className="btn-primary mr-2" type="submit">
                  Request Account
                </button>
              </div>
            </fieldset>

            {!showSuccessMsg ? (
              <div className="info w-1/4">
                <InfoBox
                  heading="Why do we need this?"
                  subtext="Information for health workers and school personnel"
                />
              </div>
            ) : (
              <section className="success info flex justify-center">
                <p className="sub-heading text-blue text-center">
                  Thanks for submitting your request! <br />
                  Someone will contact you shortly.
                </p>
              </section>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default RequestAccount;
