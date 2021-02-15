// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Modal from 'components/Modal';

import { editSite, getSite } from 'services/api';

const EditSiteModal = ({ showModal, handleClose, siteId }) => {
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
      title="Edit site"
      confirmationAction={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Site Name"
          placeholder="Site name"
          onChange={({ target }) => handleOnChange('name', target.value)}
          value={site?.name || ''}
        />

        <Input
          name="street"
          label="Street address"
          placeholder="Street address"
          onChange={({ target }) =>
            handleOnChange('street', target.value, true)
          }
          value={site?.address.street || ''}
          className="mt-2"
        />

        <fieldset className="flex">
          <div className="w-1/2 mr-1">
            <Input
              name="city"
              label="City"
              placeholder="City"
              onChange={({ target }) =>
                handleOnChange('city', target.value, true)
              }
              value={site?.address.city || ''}
              className="mt-2"
            />
          </div>

          <div className="w-1/4 mr-1">
            <Input
              name="state"
              label="State"
              placeholder="State"
              onChange={({ target }) =>
                handleOnChange('state', target.value, true)
              }
              value={site?.address.state || ''}
              className="mt-2"
            />
          </div>
          <div className="w-1/4">
            <Input
              name="zip"
              label="Zip code"
              placeholder="Zip code"
              onChange={({ target }) =>
                handleOnChange('zip', target.value, true)
              }
              value={site?.address.zip || ''}
              className="mt-2"
            />
          </div>
        </fieldset>

        <Input
          name="contact"
          label="Contact Name"
          placeholder="Contact Name"
          onChange={({ target }) => handleOnChange('contact', target.value)}
          value={site?.contact || ''}
          className="mt-2"
        />

        <Input
          name="contactEmail"
          label="Contact Email"
          type="email"
          placeholder="Contact Email"
          onChange={({ target }) =>
            handleOnChange('contactEmail', target.value)
          }
          value={site?.contactEmail || ''}
          className="mt-2"
        />
        <Input
          name="cliaNumber"
          label="CLIA Number"
          placeholder="CLIA Number"
          onChange={({ target }) => handleOnChange('cliaNumber', target.value)}
          value={site?.cliaNumber || ''}
          className="mt-2"
        />

        {errors.email && <span>This field is required</span>}
      </form>
    </Modal>
  );
};

export default EditSiteModal;
