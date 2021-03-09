// @ts-nocheck
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Autocomplete from 'components/Autocomplete';
import Input, { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Map from 'components/Map';
import PageHeader from 'components/PageHeader';
import Select from 'components/Select';

import { useDebounce } from 'hooks';

// eslint-disable-next-line no-unused-vars
import { searchSchool, getSchool } from 'services/api';

import { STATE_OPTIONS } from 'rt-constants';

const RequestSite = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchool, setCurrentSchool] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const { handleSubmit, errors, register, control, setValue } = useForm();
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    toast.success('Your request was submitted successfully.');
    setShowSuccessMsg(true);
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
        // setIsSearching(true);
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
        // shouldValidate: true,
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
      <PageHeader headline="Request a site" />
      <section className="flex mb-4">
        <form className="w-2/5 mr-8" onSubmit={handleSubmit(onSubmit)}>
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
              <ControlledInput
                name="street"
                label="Street Address"
                placeholder="1234 Street Rd."
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="street" />
            </div>
            <div className="w-1/2">
              <ControlledInput
                name="city"
                label="City"
                placeholder="Hill Valley"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="city" />
            </div>
          </fieldset>

          <fieldset className="flex">
            <div className="w-1/2 mr-2">
              <ControlledInput
                name="county"
                label="County"
                placeholder="Your County"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="county" />
            </div>
            <div className="w-1/4">
              <Controller
                control={control}
                name="state"
                label="State"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                }}
                render={({ onChange, value, ref }) => (
                  <Select
                    name="state"
                    label="State"
                    options={STATE_OPTIONS}
                    isRequired
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    className="mt-0"
                  />
                )}
              />
              <ErrorMessage errors={errors} errorKey="state" />
            </div>

            <div className="w-1/4 ml-2">
              <ControlledInput
                name="zip"
                label="Zip Code"
                placeholder="43035"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />

              <ErrorMessage errors={errors} errorKey="zip" />
            </div>
          </fieldset>

          <ControlledInput
            name="contact_name"
            label="Contact name"
            placeholder="John/Jane Doe"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="contact_name" />

          <ControlledInput
            name="contact_email"
            label="Contact email address"
            placeholder="contact@example.com"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('errorMessages.email.invalid'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="contact_email" />

          <Controller
            control={control}
            name="contact_phone_number"
            defaultValue=""
            // eslint-disable-next-line no-unused-vars
            render={({ onChange, value }) => (
              <Input
                name="contact_phone_number"
                label="Contact phone number"
                placeholder="(555) 867-5309"
                onChange={({ target }) => {
                  const x = target.value
                    .replace(/\D/g, '')
                    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                  // eslint-disable-next-line no-param-reassign
                  target.value = !x[2]
                    ? x[1]
                    : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
                  onChange(target.value);
                }}
              />
            )}
          />

          <div className="btn-row mt-4">
            <button className="btn-primary mr-2" type="submit">
              Request Site
            </button>

            <button
              className="btn-clear"
              type="button"
              onClick={handleClearState}
            >
              Cancel
            </button>
          </div>
        </form>

        <section className="w-3/5 flex justify-center items-center">
          {showSuccessMsg ? (
            <p className="sub-heading text-blue text-center">
              Thanks for submitting your request! <br />
              Someone will contact you shortly.
            </p>
          ) : (
            <Map center={mapCenter} zoom={mapZoom} />
          )}
        </section>
      </section>
    </>
  );
};

export default RequestSite;
