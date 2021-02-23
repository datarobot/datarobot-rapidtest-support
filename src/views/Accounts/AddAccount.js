// @ts-nocheck
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Icon from 'components/Icon';
import Input from 'components/Input';
import PageHeader from 'components/PageHeader';
import { ROUTES } from 'rt-constants';
import { requestAccess } from 'services/api';

const AddAccount = () => {
  const { control, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    requestAccess(data)
      .then((res) => {
        if (res.id) {
          history.push(ROUTES.ACCOUNTS);
        }
      })
      .catch(() => {
        // handle errors
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
            </div>
          </fieldset>

          <Controller
            name="email_address"
            control={control}
            defaultValue=""
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
          {errors.email && <span>This field is required</span>}

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

          <div className="btn-row mt-4">
            <button className="btn-primary" type="submit">
              Save Info
            </button>

            <button className="btn-clear" onClick={() => {}}>
              Cancel
            </button>
          </div>
        </form>

        <div className="w-1/4">
          <div className="leading-8 text-blue">
            <Icon iconName="question-circle" />
          </div>
          <p className="font-bold text-blue my-4">Account requirements</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            quisque urna quam mauris quis.
          </p>
        </div>
      </section>
    </>
  );
};

export default AddAccount;
