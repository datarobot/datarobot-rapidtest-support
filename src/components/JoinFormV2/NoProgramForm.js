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
import Radio from 'components/Radio';
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
              placeholder="Select your state"
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
                v2
                name="firstName"
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
                v2
                name="lastName"
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
            name="email"
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
                name="email"
                label="Email Address"
                placeholder="Email Address"
                onChange={onChange}
                value={value}
                isRequired
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="email" />
        </fieldset>

        <fieldset className="mb-6">
          <p className="sub-heading text-xl">Do you have tests?</p>
          <Controller
            name="hasTests"
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
                name="hasTests"
                onChange={onChange}
                wrapperClass="flex w-1/3 justify-between"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="hasTests" />
        </fieldset>
        <fieldset className="mb-6">
          <p className="sub-heading text-xl">
            Are you a member of state or local health authority?
          </p>
          <Controller
            name="isLocalAuthority"
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
                name="isLocalAuthority"
                onChange={onChange}
                wrapperClass="flex w-1/3 justify-between"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="isLocalAuthority" />
          {/* UNCOMMENT THIS WHEN THERE IS SOMETHING MORE THAN SCHOOL DISTRICT  */}
          {/* <Controller
            name="authorityType"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Select
                options={[
                  { value: 'schoolDistrict', label: 'School District' },
                ]}
                name="authorityType"
                onChange={onChange}
                disabled
                value={'schoolDistrict'}
                className="mt-4"
              />
            )}
          /> */}
        </fieldset>

        <fieldset className="mb-6">
          <p className="sub-heading text-xl -mb-4">
            How many tests does your program plan on doing per day?
          </p>

          <Controller
            name="testsPerDay"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Input
                v2
                name="testsPerDay"
                label="Optional"
                label="Optional"
                placeholder="Number of tests"
                onChange={onChange}
                type="number"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="testsPerDay" />
        </fieldset>

        <Button v2 primary type="submit" label="Request Test Admin Account" />
      </form>
    </section>
  );
};

export default NoProgramForm;
