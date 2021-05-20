// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { STATE_OPTIONS } from 'rt-constants';
import { useDebounce } from 'hooks';
import { loadGoogleScript } from 'utils';
import { addSite, searchSchool, getSchool } from 'services/api';

import Autocomplete from 'components/Autocomplete';
import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import Map from 'components/Map';

const AddSiteV2 = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setValue } = useForm();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchool, setCurrentSchool] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const [formValues, setFormValues] = useState({});
  const [geocoder, setGeocoder] = useState();

  useEffect(() => {
    if (!geocoder) {
      loadGoogleScript(() => setGeocoder(new window.google.maps.Geocoder()));
    }
  }, []);

  const onSubmit = (data) => {
    addSite({
      ...data,
      latitude: currentSchool?.lat,
      longitude: currentSchool?.lng,
    })
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

  const doGeocoding = (address) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({ lat: lat(), lng: lng() });
        setMapZoom(16);
      } else {
        console.error(`Geocode failed: ${status}`);
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

  const updateForm = ({ target }) => {
    const { name, value } = target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { street, city, state, zip } = formValues;
    if (street && city && state && zip) {
      const address = `${street} ${city}, ${state}, ${zip}`;
      doGeocoding(address);
    }
  }, [formValues]);

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
    <>
      <h2>{t('addSite.title')}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          render={({ onChange, value }) => (
            <Autocomplete
              v2
              inputName="site_name"
              label={t('site.label.name')} // "Site Name"
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
              listValues={schools}
              onItemClick={handleListItemClick}
              onClearClick={handleClearState}
              isRequired
            />
          )}
        />
        <ErrorMessage errors={errors} errorKey="site_name" />

        <div className="w-full mt-6" style={{ height: '240px' }}>
          <Map center={mapCenter} zoom={mapZoom} />
        </div>

        <Controller
          name="district"
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
              v2
              name="district"
              label="District"
              onChange={onChange}
              value={
                currentSchool?.district ? currentSchool?.district : value || ''
              }
              className="mt-1"
              isRequired
              onBlur={updateForm}
            />
          )}
        />
        <ErrorMessage errors={errors} errorKey="street" />

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
                  v2
                  name="street"
                  label={t('site.label.street')} // "Street address"
                  onChange={onChange}
                  value={
                    currentSchool?.street ? currentSchool?.street : value || ''
                  }
                  className="mt-1"
                  isRequired
                  onBlur={updateForm}
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
                  v2
                  name="city"
                  label={t('site.label.city')} // "City"
                  onChange={onChange}
                  value={
                    currentSchool?.city ? currentSchool?.city : value || ''
                  }
                  className="mt-1"
                  isRequired
                  onBlur={updateForm}
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
                  v2
                  name="county"
                  label={t('site.label.county')}
                  onChange={onChange}
                  value={
                    currentSchool?.county ? currentSchool?.county : value || ''
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
                  v2
                  name="state"
                  label="State"
                  options={STATE_OPTIONS}
                  isRequired
                  onChange={onChange}
                  value={currentSchool?.state || value}
                  className="mt-1"
                  onBlur={updateForm}
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
                  v2
                  name="zip"
                  label={t('site.label.zip')}
                  onChange={onChange}
                  value={currentSchool?.zip ? currentSchool?.zip : value || ''}
                  className="mt-1"
                  isRequired
                  onBlur={updateForm}
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
              v2
              name="contact_name"
              label={t('site.label.contactName')}
              onChange={onChange}
              value={value}
              optional
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
              v2
              name="contact_email"
              label={t('site.label.contactEmail')}
              type="email"
              onChange={onChange}
              value={value}
              optional
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
              v2
              name="clia"
              label={t('site.label.cliaNumber')}
              onChange={onChange}
              value={value}
              className="mt-1"
              isRequired
            />
          )}
        />
        <ErrorMessage errors={errors} errorKey="clia" />

        <div className="btn-row end mt-4">
          <Button v2 primary small className="ml-4" type="submit">
            Add site
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddSiteV2;
