// @ts-nocheck
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Input from 'components/Input';
import Modal from 'components/Modal';

import { addSite } from 'services/api';

const AddSiteModal = ({ showModal, handleClose }) => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    addSite(data)
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
      title="Add a site"
      confirmationAction={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="name"
              label="Site Name"
              placeholder="Site name"
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="street"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="street"
              label="Street address"
              placeholder="Street address"
              onChange={onChange}
              value={value}
              className="mt-2"
            />
          )}
        />

        <fieldset className="flex">
          <div className="w-1/2 mr-1">
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  name="city"
                  label="City"
                  placeholder="City"
                  onChange={onChange}
                  value={value}
                  className="mt-2"
                />
              )}
            />
          </div>

          <div className="w-1/4 mr-1">
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  name="state"
                  label="State"
                  placeholder="State"
                  onChange={onChange}
                  value={value}
                  className="mt-2"
                />
              )}
            />
          </div>
          <div className="w-1/4">
            <Controller
              name="zip"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  name="zip"
                  label="Zip code"
                  placeholder="Zip code"
                  onChange={onChange}
                  value={value}
                  className="mt-2"
                />
              )}
            />
          </div>
        </fieldset>

        <Controller
          name="contact"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="contact"
              label="Contact Name"
              placeholder="Contact Name"
              onChange={onChange}
              value={value}
              className="mt-2"
            />
          )}
        />

        <Controller
          name="contactEmail"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="contactEmail"
              label="Contact Email"
              type="email"
              placeholder="Contact Email"
              onChange={onChange}
              value={value}
              className="mt-2"
            />
          )}
        />

        <Controller
          name="cliaNumber"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              name="cliaNumber"
              label="CLIA Number"
              placeholder="CLIA Number"
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
