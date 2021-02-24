// @ts-nocheck
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';

import Input from 'components/Input';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';
import Map from 'components/Map';

import { STATE_OPTIONS } from 'rt-constants';

import { currentSiteAtom } from 'store';

// eslint-disable-next-line no-unused-vars
import { editSite } from 'services/api';

const Edit = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors } = useForm();
  const [mapCenter] = useState();
  const [mapZoom] = useState();

  const [currentSite, setCurrentSite] = useAtom(currentSiteAtom);

  const onSubmit = () => {
    editSite(currentSite.id, currentSite)
      .then(() => {
        // Do stuff
      })
      .catch(() => {
        // handle errors
      });
  };

  const handleOnChange = (prop, val) => {
    setCurrentSite((prevState) => ({ ...prevState, [prop]: val }));
  };

  return (
    <section className="mb-12">
      <PageHeader
        headline={`${t('editSite.title')} ${currentSite.site_name}`}
      />

      <div className="flex">
        <form className="mr-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="site_name"
            label={t('site.label.name')}
            placeholder={t('site.label.name')}
            onChange={({ target }) => handleOnChange('site_name', target.value)}
            value={currentSite?.site_name || ''}
          />

          <Input
            name="street"
            label={t('site.label.street')}
            placeholder={t('site.label.street')}
            onChange={({ target }) =>
              handleOnChange('street', target.value, true)
            }
            value={currentSite?.street || ''}
          />

          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <Input
                name="county"
                label={t('site.label.county')}
                placeholder={t('site.label.county')}
                onChange={({ target }) =>
                  handleOnChange('county', target.value)
                }
                value={currentSite?.county || ''}
                className="mt-1"
                isRequired
              />

              {errors && errors.county && (
                <p className="text-dark-red font-bold text-xs uppercase">
                  {errors.county.message}
                </p>
              )}
            </div>

            <div className="w-1/4 mr-2">
              <Select
                label={t('site.label.state')}
                options={STATE_OPTIONS}
                value={currentSite?.state || ''}
                onChange={({ target }) => handleOnChange('state', target.value)}
              />
            </div>

            <div className="w-1/4">
              <Input
                name="zip"
                label={t('site.label.zip')}
                placeholder={t('site.label.zip')}
                onChange={({ target }) => handleOnChange('zip', target.value)}
                value={currentSite?.zip || ''}
                className="mt-1"
                isRequired
              />

              {errors && errors.zip && (
                <p className="text-dark-red font-bold text-xs uppercase">
                  {errors.zip.message}
                </p>
              )}
            </div>
          </fieldset>

          <Input
            name="contact_name"
            label={t('site.label.contactName')}
            placeholder={t('site.label.contactName')}
            onChange={({ target }) =>
              handleOnChange('contact_name', target.value)
            }
            value={currentSite?.contact_name || ''}
          />

          <Input
            name="contactEmail"
            label={t('site.label.contactEmail')}
            type="email"
            placeholder={t('site.label.contactEmail')}
            onChange={({ target }) =>
              handleOnChange('contactEmail', target.value)
            }
            value={currentSite?.contact_email || ''}
          />
          <Input
            name="clia"
            label={t('site.label.cliaNumber')}
            placeholder={t('site.label.cliaNumber')}
            onChange={({ target }) => handleOnChange('clia', target.value)}
            value={currentSite?.clia || ''}
          />

          {errors.email && <span>This field is required</span>}

          <div className="btn-row mt-4">
            <button className="btn-primary" type="submit">
              Save Info
            </button>

            <button className="btn-clear" type="button">
              Cancel
            </button>
          </div>
        </form>
        <div className="w-1/2 2xl:w-full">
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
    </section>
  );
};

export default Edit;
