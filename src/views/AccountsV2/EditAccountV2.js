// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { editAccount, getAccount } from 'services/api';
import { currentAccountAtom, accountsSidebarAtom } from 'rt-store';

import ErrorMessage from 'components/ErrorMessage';
import Loading from 'components/Loading';
import { ControlledCheckbox } from 'components/Checkbox';
import { ControlledInput } from 'components/Input';
import Button from 'components/Button';

const EditAccountV2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { handleSubmit, errors, register } = useForm();
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom);
  const [patchData, setPatchData] = useState();
  const [{ id }] = useAtom(accountsSidebarAtom);

  const onSubmit = () => {
    if (patchData) {
      editAccount(currentAccount.id, patchData)
        .then(() => {
          toast.success('Success!', {
            closeButton: false,
            hideProgressBar: true,
            autoClose: 1500,
          });
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const handleOnChange = (prop, val) => {
    setPatchData((prevState) => ({ ...prevState, [prop]: val }));
    setCurrentAccount((prevState) => ({ ...prevState, [prop]: val }));
  };

  useEffect(() => {
    setIsLoading(true);
    getAccount(id)
      .then((account) => {
        setCurrentAccount(account);
      })
      .catch((err) => {
        const resp = err.response.data.errors;
        for (const key in resp) {
          if (Object.hasOwnProperty.call(resp, key)) {
            const msg = resp[key];
            toast.error(msg, { autoClose: 10000 });
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, setCurrentAccount]);

  if (isLoading) return <Loading />;

  return (
    <>
      <h3 className="mb-2">
        {t('editSite.title')} {currentAccount?.first_name}{' '}
        {currentAccount?.last_name}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          v2
          name="first_name"
          label="First name"
          placeholder="First name"
          onChange={({ target }) => handleOnChange('first_name', target.value)}
          value={currentAccount?.first_name || ''}
          ref={register({
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          })}
          isRequired
        />
        <ErrorMessage errors={errors} errorKey="first_name" />

        <ControlledInput
          v2
          name="last_name"
          label="Last name"
          placeholder="Last name"
          onChange={({ target }) => handleOnChange('last_name', target.value)}
          value={currentAccount?.last_name || ''}
          isRequired
        />
        <ErrorMessage errors={errors} errorKey="last_name" />

        <ControlledInput
          v2
          name="email_address"
          label="Email address"
          placeholder="Email address"
          type="email"
          disabled
          value={currentAccount?.email_address || ''}
        />
        <ErrorMessage errors={errors} errorKey="email_address" />

        <ControlledInput
          v2
          name="phone_number_office"
          label="Phone number"
          placeholder="Phone number"
          onChange={({ target }) => {
            const x = target.value
              .replace(/\D/g, '')
              .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            // eslint-disable-next-line no-param-reassign
            target.value = !x[2]
              ? x[1]
              : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
            handleOnChange('phone_number_office', target.value);
          }}
          value={currentAccount?.phone_number_office || ''}
          optional
        />

        <ControlledCheckbox
          v2
          name="archive"
          ref={register}
          isChecked={!currentAccount?.archive || false}
          onChange={({ target }) => {
            handleOnChange('archive', !target.checked);
          }}
          label="Active"
          labelClass="mt-4"
        />

        <div className="btn-row end mt-4">
          <Button
            v2
            primary
            small
            className="w-full"
            type="submit"
            disabled={!patchData}
          >
            Save Info
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditAccountV2;
