// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useAtom } from 'jotai';

import Autocomplete from 'components/Autocomplete';
import Input from 'components/Input';
import Select from 'components/Select';
import Map from 'components/Map';
import Modal from 'components/Modal';

import { STATE_OPTIONS } from 'rt-constants';

import { sitesAtom } from 'store';
import { useDebounce } from 'hooks';

// eslint-disable-next-line no-unused-vars
import { addSite, searchSchool, getSchool } from 'services/api';

const AddSiteModal = ({ showModal, handleClose }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setValue } = useForm();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchool, setCurrentSchool] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const [sites, setSites] = useAtom(sitesAtom);

  const onSubmit = (data) => {
    const { address, city, state, zip } = data;

    setSites([...sites, { ...data, address: { address, city, state, zip } }]);
    handleClose();
    // addSite(data)
    //   .then(() => {
    //     // Do stuff
    //   })
    //   .catch(() => {
    //     // handle errors
    //   });
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

    setValue('name', school.name, {
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

  const handleClearSite = () => {
    setCurrentSchool();
    setSearchTerm('');
  };

  const handleClearState = () => {
    setCurrentSchool();
    setSearchTerm('');
    setSchools([]);
    setMapCenter();
    setMapZoom();
  };

  return (
    <Modal
      show={showModal}
      handleClose={() => {
        handleClearState();
        handleClose();
      }}
      title={t('addSite.title')}
      // Add a site
      confirmationAction={handleSubmit(onSubmit)}
      modalClassName="w-3/4"
    >
      <div className="flex">
        <form className="w-1/2 mr-2" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
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
                inputName="name"
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
                  currentSchool?.name ? currentSchool?.name : value || ''
                }
                inputRef={ref}
                listValues={schools}
                onItemClick={handleListItemClick}
                onClearClick={handleClearSite}
                isRequired
              />
            )}
          />
          {errors && errors.name && (
            <p className="text-dark-red font-bold text-xs uppercase">
              {errors.name.message}
            </p>
          )}
          <Controller
            name="address"
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
                name="address"
                label={t('site.label.street')} // "Street address"
                placeholder={t('site.label.street')}
                onChange={onChange}
                value={
                  currentSchool?.address.address
                    ? currentSchool?.address.address
                    : value || ''
                }
                className="mt-2"
                isRequired
              />
            )}
          />
          {errors && errors.address && (
            <p className="text-dark-red font-bold text-xs uppercase">
              {errors.address.message}
            </p>
          )}
          <fieldset className="flex">
            <div className="w-1/2 mr-1">
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
                      currentSchool?.address.city
                        ? currentSchool?.address.city
                        : value || ''
                    }
                    className="mt-2"
                    isRequired
                  />
                )}
              />
              {errors && errors.city && (
                <p className="text-dark-red font-bold text-xs uppercase">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="w-1/4 mr-1">
              <Controller
                name="state"
                control={control}
                defaultValue=""
                onChange={(value) => value}
                as={Select}
                options={STATE_OPTIONS}
                value={
                  currentSchool?.address.state
                    ? currentSchool?.address.state
                    : ''
                }
                label={t('site.label.state')}
                className="mt-2"
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
                      currentSchool?.address.zip
                        ? currentSchool?.address.zip
                        : value || ''
                    }
                    className="mt-2"
                    isRequired
                  />
                )}
              />
              {errors && errors.zip && (
                <p className="text-dark-red font-bold text-xs uppercase">
                  {errors.zip.message}
                </p>
              )}
            </div>
          </fieldset>

          <Controller
            name="contact"
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
                name="contact"
                label={t('site.label.contactName')}
                placeholder={t('site.label.contactName')}
                onChange={onChange}
                value={value}
                className="mt-2"
                isRequired
              />
            )}
          />
          {errors && errors.contact && (
            <p className="text-dark-red font-bold text-xs uppercase">
              {errors.contact.message}
            </p>
          )}

          <Controller
            name="contactEmail"
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
                name="contactEmail"
                label={t('site.label.contactEmail')}
                type="email"
                placeholder={t('site.label.contactEmail')}
                onChange={onChange}
                value={value}
                className="mt-2"
                isRequired
              />
            )}
          />
          {errors && errors.contactEmail && (
            <p className="text-dark-red font-bold text-xs uppercase">
              {errors.contactEmail.message}
            </p>
          )}

          <Controller
            name="cliaNumber"
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
                name="cliaNumber"
                label={t('site.label.cliaNumber')}
                placeholder={t('site.label.cliaNumber')}
                onChange={onChange}
                value={value}
                className="mt-2"
                isRequired
              />
            )}
          />
          {errors && errors.cliaNumber && (
            <p className="text-dark-red font-bold text-xs uppercase">
              {errors.cliaNumber.message}
            </p>
          )}
        </form>
        <div className="w-1/2 2xl:w-full">
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
    </Modal>
  );
};

export default AddSiteModal;
