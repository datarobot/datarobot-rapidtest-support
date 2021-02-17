// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import Autocomplete from 'components/Autocomplete';
import Input from 'components/Input';
import Map from 'components/Map';
import Modal from 'components/Modal';

import { useDebounce } from 'hooks';

import { addSite, searchSchool, getSchool } from 'services/api';

const AddSiteModal = ({ showModal, handleClose }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors } = useForm();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchool, setCurrentSchool] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();

  const onSubmit = (data) => {
    addSite(data)
      .then(() => {
        // Do stuff
      })
      .catch(() => {
        // handle errors
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
        <form className="max-w-lg mr-2" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
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
                listValues={schools}
                onItemClick={handleListItemClick}
                onClearClick={handleClearSite}
              />
            )}
          />

          <Controller
            name="street"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="street"
                label={t('site.label.street')} // "Street address"
                placeholder={t('site.label.street')}
                onChange={onChange}
                value={
                  currentSchool?.address.address
                    ? currentSchool?.address.address
                    : value || ''
                }
                className="mt-2"
              />
            )}
          />

          <fieldset className="flex">
            <div className="w-1/2 mr-1">
              <Controller
                name="city"
                control={control}
                defaultValue=""
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
                  />
                )}
              />
            </div>

            <div className="w-1/4 mr-1">
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <Input
                    name="state"
                    label={t('site.label.state')}
                    placeholder={t('site.label.state')}
                    onChange={onChange}
                    value={
                      currentSchool?.address.state
                        ? currentSchool?.address.state
                        : value || ''
                    }
                    className="mt-2"
                  />
                )}
              />
            </div>
            <div className="w-1/4">
              <Controller
                name="zip"
                control={control}
                defaultValue=""
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
                  />
                )}
              />
            </div>
          </fieldset>

          <Controller
            name="contact"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="contact"
                label={t('site.label.contactName')}
                placeholder={t('site.label.contactName')}
                onChange={onChange}
                value={value}
                className="mt-2"
              />
            )}
          />

          <Controller
            name="contactEmail"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="contactEmail"
                label={t('site.label.contactEmail')}
                type="email"
                placeholder={t('site.label.contactEmail')}
                onChange={onChange}
                value={value}
                className="mt-2"
              />
            )}
          />

          <Controller
            name="cliaNumber"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                name="cliaNumber"
                label={t('site.label.cliaNumber')}
                placeholder={t('site.label.cliaNumber')}
                onChange={onChange}
                value={value}
                className="mt-2"
              />
            )}
          />
          {errors.email && <span>This field is required</span>}
        </form>
        <div className="w-full max-w-lg">
          <Map center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
    </Modal>
  );
};

export default AddSiteModal;
