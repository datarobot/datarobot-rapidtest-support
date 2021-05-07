// @ts-nocheck
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  NO_PROGRAMS_FULL,
  STATE_OPTIONS_FULL,
  YES_NO_RADIOS,
} from 'rt-constants';
import { startProgramDetails } from 'rt-store';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
// import Select from 'components/Select';
import Radio from 'components/RadioV2';
import Button from 'components/Button';
import Select from 'components/Select';

const NoProgramForm = () => {
  const { t } = useTranslation();

  const [currentState, setCurrentState] = useState('');
  const onStateChange = ({ target: { value: newValue } }) => {
    const { label } = STATE_OPTIONS_FULL.filter(
      ({ value }) => newValue === value
    )[0];
    setCurrentState(label);
  };

  const [, setStartProgramDetails] = useAtom(startProgramDetails);
  const onSubmit = (data) => {
    setStartProgramDetails(data);
    toast.success(
      // eslint-disable-next-line quotes
      "Thanks for your interest! Unfortunately this feature hasn't been implemented yet."
    );
  };

  const { control, errors, handleSubmit } = useForm();

  return (
    <section>
      <p className="mt-4">Select your state to start a program </p>
      <section>
        <div className="flex">
          <div className="w-full">
            <Select
              v2
              name="join-state-select"
              label="State"
              placeholder="Select"
              options={NO_PROGRAMS_FULL}
              onChange={onStateChange}
              value={currentState}
            />
          </div>
        </div>
      </section>
      <form className="w-full mt-0" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="mb-6">
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
            render={({ onChange, value }, rest) => (
              <Input
                v2
                name="first_name"
                label="First Name"
                onChange={onChange}
                value={value}
                isRequired
                errorMessage={errors?.first_name?.message}
              />
            )}
          />

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
                onChange={onChange}
                value={value}
                isRequired
                errorMessage={errors?.last_name?.message}
              />
            )}
          />

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
                label="Email Address"
                onChange={onChange}
                value={value}
                isRequired
                errorMessage={errors?.email_address?.message}
              />
            )}
          />
        </fieldset>

        <fieldset className="mb-6">
          <h6>Do you have tests?</h6>
          <Controller
            name="has_tests"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Radio
                values={YES_NO_RADIOS}
                name="has_tests"
                onChange={onChange}
                wrapperClass="flex w-1/3 justify-between mt-4"
              />
            )}
          />
          <ErrorMessage v2 errors={errors} errorKey="has_tests" />
        </fieldset>

        <fieldset className="mb-6">
          <h6>Are you a member of state or local health authority?</h6>
          <Controller
            name="is_local_authority"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Radio
                values={YES_NO_RADIOS}
                name="is_local_authority"
                onChange={onChange}
                wrapperClass="flex w-1/3 justify-between mt-4"
              />
            )}
          />
          <ErrorMessage v2 errors={errors} errorKey="is_local_authority" />
        </fieldset>

        <fieldset className="mb-6">
          <h6 className="-mb-4">
            How many tests does your program plan on doing per day?
          </h6>
          <Controller
            name="tests_per_day"
            control={control}
            defaultValue=""
            render={({ onChange }) => (
              <Input
                v2
                name="tests_per_day"
                optional
                onChange={onChange}
                type="number"
              />
            )}
          />
          <ErrorMessage v2 errors={errors} errorKey="tests_per_day" />
        </fieldset>

        <Button v2 primary type="submit" className="w-full md:w-auto">
          Request account
        </Button>
      </form>
    </section>
  );
};

export default NoProgramForm;
