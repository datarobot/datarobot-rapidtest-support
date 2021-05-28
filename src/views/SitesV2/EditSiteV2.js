// @ts-nocheck
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { STATE_OPTIONS } from 'rt-constants';
import { sitesSidebarAtom, currentSiteAtom } from 'rt-store';
import { editSite, getSite } from 'services/api';

import { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Loading from 'components/Loading';
import Select from 'components/Select';
import Button from 'components/Button';
import Map from 'components/Map';

const EditSiteV2 = () => {
  const [{ id }] = useAtom(sitesSidebarAtom);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { handleSubmit, errors, register } = useForm();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();

  const [currentSite, setCurrentSite] = useAtom(currentSiteAtom);

  const onSubmit = (data) => {
    editSite(id, data)
      .then(() => {
        toast.success('Success!', {
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
    if (!id) return;
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

  if (isLoading) return <Loading />;

  return (
    <>
      <h3 className="mb-2">
        {t('editSite.title')} {currentSite.site_name || 'untitled'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          v2
          name="site_name"
          label={t('site.label.name')}
          onChange={({ target }) => handleOnChange('site_name', target.value)}
          value={currentSite?.site_name || ''}
          ref={register}
          isRequired
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />

        <div className="w-full mt-6" style={{ height: '240px' }}>
          <Map center={mapCenter} zoom={mapZoom} />
        </div>

        <ControlledInput
          v2
          name="district"
          label="District"
          onChange={({ target }) =>
            handleOnChange('district', target.value, true)
          }
          value={currentSite?.district || ''}
          ref={register}
          isRequired
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />

        <ControlledInput
          v2
          name="street"
          label={t('site.label.street')}
          onChange={({ target }) =>
            handleOnChange('street', target.value, true)
          }
          value={currentSite?.street || ''}
          ref={register}
          isRequired
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />

        <ControlledInput
          v2
          name="city"
          label={t('site.label.city')}
          onChange={({ target }) => handleOnChange('city', target.value, true)}
          value={currentSite?.city || ''}
          isRequired
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />

        <ControlledInput
          v2
          name="county"
          label={t('site.label.county')}
          onChange={({ target }) => handleOnChange('county', target.value)}
          value={currentSite?.county || ''}
          className="mt-1"
          isRequired
          ref={register}
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />
        <ErrorMessage errors={errors} errorKey="county" />

        <Select
          v2
          name="state"
          label={t('site.label.state')}
          options={STATE_OPTIONS}
          value={currentSite?.state || ''}
          isRequired
          onChange={({ target }) => handleOnChange('state', target.value)}
          ref={register}
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />

        <ControlledInput
          v2
          name="zip"
          label={t('site.label.zip')}
          onChange={({ target }) => handleOnChange('zip', target.value)}
          value={currentSite?.zip || ''}
          className="mt-1"
          isRequired
          ref={register}
          rules={{
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          }}
        />
        <ErrorMessage errors={errors} errorKey="zip" />

        <ControlledInput
          v2
          name="contact_name"
          label={t('site.label.contactName')}
          onChange={({ target }) =>
            handleOnChange('contact_name', target.value)
          }
          optional
          ref={register}
          value={currentSite?.contact_name || ''}
        />

        <ControlledInput
          v2
          name="contact_email"
          label={t('site.label.contactEmail')}
          type="email"
          onChange={({ target }) =>
            handleOnChange('contact_email', target.value)
          }
          value={currentSite?.contact_email || ''}
          optional
          ref={register}
        />

        <ControlledInput
          v2
          name="clia_holder_name"
          label={t('site.label.cliaHolderName')}
          onChange={({ target }) =>
            handleOnChange('clia_holder_name', target.value)
          }
          value={currentSite?.clia_holder_name || ''}
          ref={register}
        />

        <ControlledInput
          v2
          name="clia"
          label={t('site.label.cliaNumber')}
          onChange={({ target }) => handleOnChange('clia', target.value)}
          value={currentSite?.clia || ''}
          optional
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
          <Button v2 small primary className="w-full" type="submit">
            Save Info
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditSiteV2;
