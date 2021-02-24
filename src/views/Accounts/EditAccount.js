// @ts-nocheck
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';

import Checkbox from 'components/Checkbox';
import Icon from 'components/Icon';
import Input from 'components/Input';
import PageHeader from 'components/PageHeader';

import { currentAccountAtom } from 'store';

import { editAccount } from 'services/api';

const Edit = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors } = useForm();
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom);

  const onSubmit = () => {
    console.log(currentAccount);

    editAccount(currentAccount.id, currentAccount)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        // handle errors
      });
  };

  const handleOnChange = (prop, val) =>
    setCurrentAccount((prevState) => ({ ...prevState, [prop]: val }));

  return (
    <section className="mb-12">
      <PageHeader
        headline={`${t('editSite.title')} ${currentAccount?.first_name} ${
          currentAccount?.last_name
        }`}
      />

      <section className="flex">
        <form className="w-2/5 mr-8" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="first_name"
            label="First name"
            placeholder="First name"
            onChange={({ target }) =>
              handleOnChange('first_name', target.value)
            }
            value={currentAccount?.first_name || ''}
          />

          <Input
            name="last_name"
            label="Last name"
            placeholder="Last name"
            onChange={({ target }) => handleOnChange('last_name', target.value)}
            value={currentAccount?.last_name || ''}
          />

          <Input
            name="email_address"
            label="Email address"
            placeholder="Email address"
            type="email"
            onChange={({ target }) =>
              handleOnChange('email_address', target.value)
            }
            value={currentAccount?.email_address || ''}
          />

          <Input
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

          <Checkbox
            isChecked={!currentAccount?.archived || false}
            onChange={({ target }) => handleOnChange('enabled', target.checked)}
            label="Enabled"
            labelClass="mt-4"
          />

          {errors.email && <span>This field is required</span>}

          <div className="btn-row mt-4">
            <button className="btn-primary" type="submit">
              Save Info
            </button>

            <button className="btn-clear" onClick={() => {}}>
              Cancel
            </button>
          </div>
        </form>

        <div className="w-1/4">
          <div className="leading-8 text-blue">
            <Icon iconName="question-circle" />
          </div>
          <p className="font-bold text-blue my-4">Account requirements</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            quisque urna quam mauris quis.
          </p>
        </div>
      </section>
    </section>
  );
};

export default Edit;
