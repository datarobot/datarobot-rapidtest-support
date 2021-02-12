// @ts-nocheck
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Input from 'components/Input';
import Modal from 'components/Modal';

import { requestAccess } from 'services/api';

const AddSiteModal = ({ showModal, handleClose }) => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    requestAccess(data)
      .then(() => {
        // Do stuff
      })
      .catch(() => {
        // handle errors
      });
  };

  return (
    <Modal
      show={showModal}
      handleClose={handleClose}
      title="Request Account"
      confirmationAction={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="firstName"
              label="First Name"
              placeholder="First name"
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Last name"
              onChange={onChange}
              value={value}
              className="mt-2"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="phone"
              label="Phone"
              placeholder="Phone"
              onChange={onChange}
              value={value}
              className="mt-2"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              onChange={onChange}
              value={value}
              className="mt-2"
            />
          )}
        />
        {errors.email && <span>This field is required</span>}
      </form>
    </Modal>
  );
};

export default AddSiteModal;
