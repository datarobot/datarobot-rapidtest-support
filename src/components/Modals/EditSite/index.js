// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Modal from 'components/Modal';

import { editSite, getSite } from 'services/api';

const EditSiteModal = ({ showModal, handleClose, siteId }) => {
  const { t } = useTranslation();
  const { handleSubmit, errors } = useForm();
  const [site, setSite] = useState();

  const onSubmit = () => {
    editSite(site.id, site)
      .then(() => {
        // Do stuff
      })
      .catch(() => {
        // handle errors
      });
  };

  useEffect(() => {
    (async () => {
      if (siteId) {
        const data = await getSite(siteId);
        setSite(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId]);

  const handleOnChange = (prop, val, isAddress = false) => {
    if (isAddress) {
      return setSite((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [prop]: val },
      }));
    }

    return setSite((prevState) => ({ ...prevState, [prop]: val }));
  };

  return (
    <Modal
      show={showModal}
      handleClose={handleClose}
      title={
        <Trans i18nKey="editSite.title" siteName={site?.name}>
          Editing {site?.name}
        </Trans>
      }
      confirmationAction={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label={t('site.label.name')}
          placeholder={t('site.label.name')}
          onChange={({ target }) => handleOnChange('name', target.value)}
          value={site?.name || ''}
        />

        <Input
          name="street"
          label={t('site.label.street')}
          placeholder={t('site.label.street')}
          onChange={({ target }) =>
            handleOnChange('street', target.value, true)
          }
          value={site?.address.street || ''}
        />

        <fieldset className="flex">
          <div className="w-1/2 mr-1">
            <Input
              name="city"
              label={t('site.label.city')}
              placeholder={t('site.label.city')}
              onChange={({ target }) =>
                handleOnChange('city', target.value, true)
              }
              value={site?.address.city || ''}
            />
          </div>

          <div className="w-1/4 mr-1">
            <Input
              name="state"
              label={t('site.label.state')}
              placeholder={t('site.label.state')}
              onChange={({ target }) =>
                handleOnChange('state', target.value, true)
              }
              value={site?.address.state || ''}
            />
          </div>
          <div className="w-1/4">
            <Input
              name="zip"
              label={t('site.label.zip')}
              placeholder={t('site.label.zip')}
              onChange={({ target }) =>
                handleOnChange('zip', target.value, true)
              }
              value={site?.address.zip || ''}
            />
          </div>
        </fieldset>

        <Input
          name="contact"
          label={t('site.label.contactName')}
          placeholder={t('site.label.contactName')}
          onChange={({ target }) => handleOnChange('contact', target.value)}
          value={site?.contact || ''}
        />

        <Input
          name="contactEmail"
          label={t('site.label.contactEmail')}
          type="email"
          placeholder={t('site.label.contactEmail')}
          onChange={({ target }) =>
            handleOnChange('contactEmail', target.value)
          }
          value={site?.contactEmail || ''}
        />
        <Input
          name="cliaNumber"
          label={t('site.label.cliaNumber')}
          placeholder={t('site.label.cliaNumber')}
          onChange={({ target }) => handleOnChange('cliaNumber', target.value)}
          value={site?.cliaNumber || ''}
        />

        {errors.email && <span>This field is required</span>}
      </form>
    </Modal>
  );
};

export default EditSiteModal;
