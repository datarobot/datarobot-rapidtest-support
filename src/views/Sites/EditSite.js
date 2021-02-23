// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useAtom } from 'jotai';

import Input from 'components/Input';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';
import Map from 'components/Map';

import { STATE_OPTIONS } from 'rt-constants';

import { sitesAtom, currentSiteAtom } from 'store';

// eslint-disable-next-line no-unused-vars
import { addSite, searchSchool, getSchool } from 'services/api';

const Edit = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors } = useForm();
  const [mapCenter] = useState();
  const [mapZoom] = useState();
  const [sites, setSites] = useAtom(sitesAtom);
  const [currentSite, setCurrentSite] = useAtom(currentSiteAtom);

  useEffect(() => {
    console.log(currentSite);
  }, [currentSite]);

  const onSubmit = (data) => {
    const { address, city, state, zip } = data;

    setSites([...sites, { ...data, address: { address, city, state, zip } }]);

    // addSite(data)
    //   .then(() => {
    //     // Do stuff
    //   })
    //   .catch(() => {
    //     // handle errors
    //   });
  };

  const handleOnChange = (prop, val, isAddress = false) => {
    if (isAddress) {
      return setCurrentSite((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [prop]: val },
      }));
    }

    return setCurrentSite((prevState) => ({ ...prevState, [prop]: val }));
  };

  return (
    <section className="mb-12">
      <PageHeader
        headline={`${t('editSite.title')} ${currentSite.site_name}`}
      />

      <div className="flex">
        <form className="mr-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="name"
            label={t('site.label.name')}
            placeholder={t('site.label.name')}
            onChange={({ target }) => handleOnChange('name', target.value)}
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
            <div className="w-1/2 mr-1">
              <Input
                name="city"
                label={t('site.label.city')}
                placeholder={t('site.label.city')}
                onChange={({ target }) =>
                  handleOnChange('city', target.value, true)
                }
                value={currentSite?.city || ''}
              />
            </div>

            <div className="w-1/4 mr-1">
              <Controller
                name="state"
                control={control}
                defaultValue=""
                onChange={(value) => value}
                as={Select}
                options={STATE_OPTIONS}
                value={currentSite?.state ? currentSite?.state : ''}
                label={t('site.label.state')}
                isRequired
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                }}
              />
              {errors && errors.state && (
                <p className="text-dark-red font-bold text-xs uppercase">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="w-1/4">
              <Input
                name="zip"
                label={t('site.label.zip')}
                placeholder={t('site.label.zip')}
                onChange={({ target }) =>
                  handleOnChange('zip', target.value, true)
                }
                value={currentSite?.zip || ''}
              />
            </div>
          </fieldset>

          <Input
            name="contact"
            label={t('site.label.contactName')}
            placeholder={t('site.label.contactName')}
            onChange={({ target }) => handleOnChange('contact', target.value)}
            value={currentSite?.contact || ''}
          />

          <Input
            name="contactEmail"
            label={t('site.label.contactEmail')}
            type="email"
            placeholder={t('site.label.contactEmail')}
            onChange={({ target }) =>
              handleOnChange('contactEmail', target.value)
            }
            value={currentSite?.contactEmail || ''}
          />
          <Input
            name="cliaNumber"
            label={t('site.label.cliaNumber')}
            placeholder={t('site.label.cliaNumber')}
            onChange={({ target }) =>
              handleOnChange('cliaNumber', target.value)
            }
            value={currentSite?.cliaNumber || ''}
          />

          {errors.email && <span>This field is required</span>}
        </form>
        <div className="w-1/2 2xl:w-full">
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
    </section>
  );
};

export default Edit;
