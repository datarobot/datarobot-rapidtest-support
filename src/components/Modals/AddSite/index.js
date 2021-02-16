// @ts-nocheck
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import Input from 'components/Input';
import Modal from 'components/Modal';

import { addSite } from 'services/api';

const AddSiteModal = ({ showModal, handleClose }) => {
  const { t } = useTranslation();
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
      title={t('addSite.title')}
      // Add a site
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
              label={t('site.label.name')} // "Site Name"
              placeholder={t('site.label.name')}
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
              label={t('site.label.street')} // "Street address"
              placeholder={t('site.label.street')}
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
                  label={t('site.label.city')} // "City"
                  placeholder={t('site.label.city')}
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
                  label={t('site.label.state')}
                  placeholder={t('site.label.state')}
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
                  label={t('site.label.zip')}
                  placeholder={t('site.label.zip')}
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
              label={t('site.label.contactName')}
              placeholder={t('site.label.contactName')}
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
              label={t('site.label.contactEmail')}
              type="email"
              placeholder={t('site.label.contactEmail')}
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
              label={t('site.label.cliaNumber')}
              placeholder={t('site.label.cliaNumber')}
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
