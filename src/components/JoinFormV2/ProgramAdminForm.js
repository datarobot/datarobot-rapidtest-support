import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { addAccount } from 'services/api';
import { NO_PROGRAMS_FULL, STATE_OPTIONS_FULL } from 'rt-constants';

import Input from 'components/Input';
import Button from 'components/Button';
import Select from 'components/Select';

const ProgramAdminForm = () => {
  const { t } = useTranslation();

  const [currentState, setCurrentState] = useState('');
  const onStateChange = ({ target: { value: val } }) => {
    const { label } = STATE_OPTIONS_FULL.find(({ value }) => val === value);
    setCurrentState(label);
  };

  const onSubmit = (data) => {
    addAccount(data)
      .then(() => {
        toast.success('Request submitted!');
      })
      .then(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'analyticsEvent',
          eventAction: 'Signup Complete',
          eventCategory: 'Registration',
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const { control, errors, handleSubmit } = useForm();

  return (
    <form className="w-full mt-0" onSubmit={handleSubmit(onSubmit)}>
      <p className="mt-4">
        The program is currently available only in Pennsylvania and Washington
      </p>
      <section>
        <Select
          v2
          name="join-state-select"
          label="State"
          placeholder="Select"
          options={NO_PROGRAMS_FULL}
          onChange={onStateChange}
          value={currentState}
        />
      </section>

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
        }}
        render={({ onChange, value }) => (
          <Input
            v2
            name="email_address"
            label="Email address"
            onChange={onChange}
            value={value}
            isRequired
            errorMessage={errors?.email_address?.message}
          />
        )}
      />

      <Controller
        name="phone_number_office"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <Input
            v2
            name="phone_number_office"
            label="Phone Number"
            optional
            placeholder="(000) 000-0000"
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

      <Button v2 primary type="submit" className="mt-6">
        Request account
      </Button>
    </form>
  );
};

export default ProgramAdminForm;
