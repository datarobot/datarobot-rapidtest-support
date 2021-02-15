// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import Modal from 'components/Modal';

import { editAccount, getAccount } from 'services/api';

const EditAccountModal = ({ showModal, handleClose, accountId, onSave }) => {
  const { handleSubmit, errors } = useForm();
  const [account, setAccount] = useState();

  const onSubmit = () => {
    editAccount(account.id, account)
      .then(() => {
        onSave();
      })
      .catch(() => {
        // handle errors
      });
  };

  useEffect(() => {
    (async () => {
      if (accountId) {
        const data = await getAccount(accountId);
        setAccount(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  const handleOnChange = (prop, val) => {
    setAccount((prevState) => ({ ...prevState, [prop]: val }));
  };

  return (
    <Modal
      show={showModal}
      handleClose={handleClose}
      title="Edit account"
      confirmationAction={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex">
          <div className="w-1/2 mr-1">
            <Input
              name="firstName"
              label="First name"
              placeholder="First name"
              onChange={({ target }) =>
                handleOnChange('firstName', target.value)
              }
              value={account?.firstName || ''}
            />
          </div>

          <div className="w-1/2">
            <Input
              name="lastName"
              label="Last name"
              placeholder="Last name"
              onChange={({ target }) =>
                handleOnChange('lastName', target.value)
              }
              value={account?.lastName || ''}
            />
          </div>
        </fieldset>

        <fieldset className="flex">
          <div className="w-1/2 mr-1">
            <Input
              name="email"
              label="Email address"
              placeholder="Email address"
              type="email"
              onChange={({ target }) => handleOnChange('email', target.value)}
              value={account?.email || ''}
            />
          </div>

          <div className="w-1/2">
            <Input
              name="phone"
              label="Phone number"
              placeholder="Phone number"
              onChange={({ target }) => handleOnChange('phone', target.value)}
              value={account?.phone || ''}
            />
          </div>
        </fieldset>

        <fieldset className="flex">
          <div className="w-1/2 mr-1">
            <Checkbox
              isChecked={!account?.requestPending || false}
              onChange={({ target }) =>
                handleOnChange('requestPending', !target.checked)
              }
              label="Approved"
              labelClass="mt-4"
            />
          </div>

          <div className="w-1/2 mr-1">
            <Checkbox
              isChecked={account?.enabled || false}
              onChange={({ target }) =>
                handleOnChange('enabled', target.checked)
              }
              label="Enabled"
              labelClass="mt-4"
              isDisabled={account?.requestPending}
            />
          </div>
        </fieldset>
        {errors.email && <span>This field is required</span>}
      </form>
    </Modal>
  );
};

export default EditAccountModal;
