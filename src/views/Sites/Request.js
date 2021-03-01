// @ts-nocheck
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Input, { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';

import { STATE_OPTIONS_FULL } from 'rt-constants';

const RequestSite = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { handleSubmit, errors, register, control } = useForm();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    setShowSuccessMsg(true);
  };

  return (
    <>
      <PageHeader headline="Request a site" />
      <section className="flex">
        <form className="w-2/5 mr-8" onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            name="site_name"
            label="Site name"
            placeholder="My site"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="site_name" />

          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <ControlledInput
                name="city"
                label="City"
                placeholder="Hill Valley"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="city" />
            </div>

            <div className="w-1/2">
              <ControlledInput
                name="street"
                label="Address"
                placeholder="1234 Street Rd."
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="street" />
            </div>
          </fieldset>

          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <ControlledInput
                name="county"
                label="County"
                placeholder="Your County"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="county" />
            </div>
            <div className="w-1/4">
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
                    className="mt-0"
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="state" />
            </div>

            <div className="w-1/4 ml-2">
              <ControlledInput
                name="zip"
                label="Zip Code"
                placeholder="43035"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />

              <ErrorMessage errors={errors} errorKey="zip" />
            </div>
          </fieldset>

          <ControlledInput
            name="contact_name"
            label="Contact name"
            placeholder="John/Jane Doe"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="contact_name" />

          <ControlledInput
            name="contact_email"
            label="Contact email address"
            placeholder="contact@example.com"
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
          <ErrorMessage errors={errors} errorKey="contact_email" />

          <Controller
            control={control}
            name="contact_phone_number"
            defaultValue=""
            // eslint-disable-next-line no-unused-vars
            render={({ onChange, value }) => (
              <Input
                name="contact_phone_number"
                label="Contact phone number"
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

export default RequestSite;
