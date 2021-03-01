// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ErrorMessage from 'components/ErrorMessage';
import Loading from 'components/Loading';
import { ControlledCheckbox } from 'components/Checkbox';
import Icon from 'components/Icon';
import { ControlledInput } from 'components/Input';
import PageHeader from 'components/PageHeader';

import { ROUTES } from 'rt-constants';

import { currentAccountAtom } from 'store';
import { editAccount, getAccount } from 'services/api';

const EditAccount = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { handleSubmit, errors, register } = useForm();
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom);
  const { id } = useParams();

  const onSubmit = () => {
    editAccount(currentAccount.id, currentAccount)
      .then(() => {
        toast.success('Success!', {
          onClose: () => {
            setCurrentAccount({});
            history.push(ROUTES.ACCOUNTS);
          },
          closeButton: false,
          hideProgressBar: true,
          autoClose: 1500,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleOnChange = (prop, val) => {
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

  return (
    <section className="mb-12">
      {currentAccount.first_name && (
        <PageHeader
          headline={`${t('editSite.title')} ${currentAccount?.first_name} ${
            currentAccount?.last_name
          }`}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <section className="flex">
          <form className="w-2/5 mr-8" onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput
              name="first_name"
              label="First name"
              placeholder="First name"
              onChange={({ target }) =>
                handleOnChange('first_name', target.value)
              }
              value={currentAccount?.first_name || ''}
              ref={register({
                required: {
                  value: true,
                  message: t('errorMessages.common.required'),
                },
              })}
            />
            <ErrorMessage errors={errors} errorKey="first_name" />

            <ControlledInput
              name="last_name"
              label="Last name"
              placeholder="Last name"
              onChange={({ target }) =>
                handleOnChange('last_name', target.value)
              }
              value={currentAccount?.last_name || ''}
            />
            <ErrorMessage errors={errors} errorKey="last_name" />

            <ControlledInput
              name="email_address"
              label="Email address"
              placeholder="Email address"
              type="email"
              onChange={({ target }) =>
                handleOnChange('email_address', target.value)
              }
              value={currentAccount?.email_address || ''}
              ref={register({
                required: {
                  value: true,
                  message: t('errorMessages.common.required'),
                },
              })}
            />
            <ErrorMessage errors={errors} errorKey="email_address" />

            <ControlledInput
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
            />

            <ControlledCheckbox
              name="archive"
              ref={register}
              isChecked={!currentAccount?.archive}
              onChange={({ target }) => {
                handleOnChange('archive', !target.checked);
              }}
              label="Active"
              labelClass="mt-4"
            />

            {errors.email && <span>This field is required</span>}

            <div className="btn-row mt-4">
              <button className="btn-primary mr-2" type="submit">
                Save Info
              </button>

              <button className="btn-clear" onClick={() => {}}>
                Cancel
              </button>
            </div>
          </form>

          <div className="w-1/4">
            <div className="leading-8 text-blue">
              <Icon iconName="question-circle" type="fal" />
            </div>
            <p className="font-bold text-blue my-4">Account requirements</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
              quisque urna quam mauris quis.
            </p>
          </div>
        </section>
      )}
    </section>
  );
};

export default EditAccount;
