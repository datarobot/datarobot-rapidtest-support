// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import { toast } from 'react-toastify';

import Autocomplete from 'components/Autocomplete';
import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';
import Map from 'components/Map';

import { ROUTES, STATE_OPTIONS } from 'rt-constants';

import { useDebounce } from 'hooks';

import { addSite, searchSchool, getSchool } from 'services/api';

const AddSite = ({ history }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setValue } = useForm();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchool, setCurrentSchool] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();

  const onSubmit = (data) => {
    const { lat, lng } = currentSchool;

    addSite({ ...data, latitude: lat, longitude: lng })
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

  const doSearch = async (val) => {
    if (val.length > 2) {
      const list = await searchSchool(val);

      setSchools(list);
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        doSearch(debouncedSearchTerm);
      } else {
        setSchools([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleListItemClick = async (id) => {
    const school = await getSchool(id);
    setSchools([]);
    setCurrentSchool(school);

    setValue('site_name', school.name, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue('street', school.address.address, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue('county', school.county, {
      shouldValidate: true,
      shouldDirty: true,
    });

    for (const key in school.address) {
      if ({}.hasOwnProperty.call(school.address, key)) {
        setValue(key, school.address[key], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
    setMapCenter({ lat: school.lat, lng: school.lng });
    setMapZoom(16);
  };

  const clearForm = () => {
    const fields = ['site_name', 'street', 'city', 'county', 'state', 'zip'];

    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];

      setValue(field, '', {
        shouldDirty: true,
      });
    }
  };

  const handleClearState = () => {
    setCurrentSchool();
    setSearchTerm('');
    setSchools([]);
    clearForm();
    setMapCenter();
    setMapZoom();
  };

  return (
    <section className="mb-12">
      <PageHeader headline={t('addSite.title')} />

      <div className="flex">
        <form className="w-1/2 mr-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="site_name"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange, value, ref }) => (
              <Autocomplete
                inputName="site_name"
                label={t('site.label.name')} // "Site Name"
                placeholder={t('site.label.name')}
                onChange={({ target }) => {
                  setSearchTerm(target.value);
                  onChange(target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace') {
                    setCurrentSchool();
                  }
                }}
                inputValue={
                  currentSchool?.site_name
                    ? currentSchool?.site_name
                    : value || ''
                }
                inputRef={ref}
                listValues={schools}
                onItemClick={handleListItemClick}
                onClearClick={handleClearState}
                isRequired
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="site_name" />

          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <Controller
                name="street"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                }}
                render={({ onChange, value }) => (
                  <Input
                    name="street"
                    label={t('site.label.street')} // "Street address"
                    placeholder={t('site.label.street')}
                    onChange={onChange}
                    value={
                      currentSchool?.street
                        ? currentSchool?.street
                        : value || ''
                    }
                    className="mt-1"
                    isRequired
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="street" />
            </div>

            <div className="w-1/2">
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                }}
                render={({ onChange, value }) => (
                  <Input
                    name="city"
                    label={t('site.label.city')} // "City"
                    placeholder={t('site.label.city')}
                    onChange={onChange}
                    value={
                      currentSchool?.city ? currentSchool?.city : value || ''
                    }
                    className="mt-1"
                    isRequired
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="city" />
            </div>
          </fieldset>

          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <Controller
                name="county"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                }}
                render={({ onChange, value }) => (
                  <Input
                    name="county"
                    label={t('site.label.county')}
                    placeholder={t('site.label.county')}
                    onChange={onChange}
                    value={
                      currentSchool?.county
                        ? currentSchool?.county
                        : value || ''
                    }
                    className="mt-1"
                    isRequired
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="county" />
            </div>

            <div className="w-1/4 mr-2">
              <Controller
                control={control}
                name="state"
                label="State"
                defaultValue={currentSchool?.state || ''}
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                }}
                render={({ onChange, value }) => (
                  <Select
                    name="state"
                    label="State"
                    options={STATE_OPTIONS}
                    isRequired
                    onChange={onChange}
                    value={currentSchool?.state || value}
                    className="mt-1"
                    placeholder="State"
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="state" />
            </div>

            <div className="w-1/4">
              <Controller
                name="zip"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                  minLength: {
                    value: 5,
                    message: t('errorMessages.zip.invalid'),
                  },
                }}
                render={({ onChange, value }) => (
                  <Input
                    name="zip"
                    label={t('site.label.zip')}
                    placeholder={t('site.label.zip')}
                    onChange={onChange}
                    value={
                      currentSchool?.zip ? currentSchool?.zip : value || ''
                    }
                    className="mt-1"
                    isRequired
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="zip" />
            </div>
          </fieldset>

          <Controller
            name="contact_name"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="contact_name"
                label={t('site.label.contactName')}
                placeholder={t('site.label.contactName')}
                onChange={onChange}
                value={value}
                className="mt-1"
              />
            )}
          />

          <Controller
            name="contact_email"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="contact_email"
                label={t('site.label.contactEmail')}
                type="email"
                placeholder={t('site.label.contactEmail')}
                onChange={onChange}
                value={value}
                className="mt-1"
              />
            )}
          />

          <Controller
            name="clia"
            control={control}
            defaultValue=""
            rules={{
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
            }}
            render={({ onChange, value }) => (
              <Input
                name="clia"
                label={t('site.label.cliaNumber')}
                placeholder={t('site.label.cliaNumber')}
                onChange={onChange}
                value={value}
                className="mt-1"
                isRequired
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="clia" />

          <div className="btn-row end mt-4">
            <button
              className="btn-clear mr-1"
              type="button"
              onClick={() => {
                handleClearState();
                history.goBack();
              }}
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
    </section>
  );
};

export default AddSite;
