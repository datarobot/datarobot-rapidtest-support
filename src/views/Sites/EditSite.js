// @ts-nocheck
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Loading from 'components/Loading';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';
import Map from 'components/Map';

import { STATE_OPTIONS, ROUTES } from 'rt-constants';

import { currentSiteAtom } from 'store';

import { editSite, getSite } from 'services/api';

const Edit = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { handleSubmit, errors, register } = useForm();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const { id } = useParams();

  const [currentSite, setCurrentSite] = useAtom(currentSiteAtom);

  const onSubmit = (data) => {
    editSite(id, data)
      .then(() => {
        toast.success('Success!', {
          onClose: () => {
            history.push(ROUTES.SITES.path);
          },
          closeButton: false,
          hideProgressBar: true,
          autoClose: 1500,
        });
      })
      .catch((err) => {
        const resp = err.response.data.errors;
        for (const key in resp) {
          if (Object.hasOwnProperty.call(resp, key)) {
            const msg = resp[key];
            toast.error(msg, { autoClose: 10000 });
          }
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getSite(id)
      .then((site) => {
        setCurrentSite(site[0]);

        if (site[0].latitude && site[0].longitude) {
          setMapCenter({ lat: site[0].latitude, lng: site[0].longitude });
          setMapZoom(16);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, setCurrentSite]);

  const handleOnChange = (prop, val) => {
    setCurrentSite((prevState) => ({ ...prevState, [prop]: val }));
  };

  return (
    <section className="mb-12">
      {currentSite.site_name && (
        <PageHeader
          headline={`${t('editSite.title')} ${currentSite.site_name}`}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex">
          <form className="mr-4" onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput
              name="site_name"
              label={t('site.label.name')}
              placeholder={t('site.label.name')}
              onChange={({ target }) =>
                handleOnChange('site_name', target.value)
              }
              value={currentSite?.site_name || ''}
              ref={register}
            />

            <ControlledInput
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
                <ControlledInput
                  name="county"
                  label={t('site.label.county')}
                  placeholder={t('site.label.county')}
                  onChange={({ target }) =>
                    handleOnChange('county', target.value)
                  }
                  value={currentSite?.county || ''}
                  className="mt-1"
                  isRequired
                  ref={register}
                />

                <ErrorMessage errors={errors} errorKey="county" />
              </div>

              <div className="w-1/4 mr-2">
                <Select
                  name="state"
                  label={t('site.label.state')}
                  options={STATE_OPTIONS}
                  value={currentSite?.state || ''}
                  isRequired
                  onChange={({ target }) =>
                    handleOnChange('state', target.value)
                  }
                  ref={register}
                />
              </div>

              <div className="w-1/4">
                <ControlledInput
                  name="zip"
                  label={t('site.label.zip')}
                  placeholder={t('site.label.zip')}
                  onChange={({ target }) => handleOnChange('zip', target.value)}
                  value={currentSite?.zip || ''}
                  className="mt-1"
                  isRequired
                  ref={register}
                />

                <ErrorMessage errors={errors} errorKey="zip" />
              </div>
            </fieldset>

            <ControlledInput
              name="contact_name"
              label={t('site.label.contactName')}
              placeholder={t('site.label.contactName')}
              onChange={({ target }) =>
                handleOnChange('contact_name', target.value)
              }
              ref={register}
              value={currentSite?.contact_name || ''}
            />

            <ControlledInput
              name="contactEmail"
              label={t('site.label.contactEmail')}
              type="email"
              placeholder={t('site.label.contactEmail')}
              onChange={({ target }) =>
                handleOnChange('contactEmail', target.value)
              }
              value={currentSite?.contact_email || ''}
              ref={register}
            />
            <ControlledInput
              name="clia"
              label={t('site.label.cliaNumber')}
              placeholder={t('site.label.cliaNumber')}
              onChange={({ target }) => handleOnChange('clia', target.value)}
              value={currentSite?.clia || ''}
              ref={register({
                rules: {
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]*$/gi,
                    message: t('errorMessages.clia.pattern'),
                  },
                  minLength: {
                    value: 10,
                    message: t('errorMessages.clia.length'),
                  },
                  maxLength: {
                    value: 10,
                    message: t('errorMessages.clia.length'),
                  },
                },
              })}
            />

            <div className="btn-row end mt-4">
              <button
                className="btn-clear mr-1"
                type="button"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>

              <button className="btn-primary mr-2" type="submit">
                Save Info
              </button>
            </div>
          </form>
          <div className="w-1/2 2xl:w-full">
            <Map center={mapCenter} zoom={mapZoom} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Edit;
