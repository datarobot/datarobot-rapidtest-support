/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { getAccountList, editAccount } from 'services/api';
import { ROUTES } from 'rt-constants';
import { accountsAtom, accountsToDisableAtom } from 'rt-store';

import Table2 from 'components/Table2';

import { download, toCsv } from 'utils';
import DisableAccountCell from 'components/Table2/DisableAccountCell';
import AccountNameCell from 'components/Table2/AccountNameCell';
import EditAccountCell from 'components/Table2/EditAccountCell';
import { toast } from 'react-toastify';

const Accounts = () => {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [accountsToDisable, setAccountsToDisable] = useAtom(
    accountsToDisableAtom
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = () => {
    const sanitizedAccounts = accounts.map((account) => {
      delete account.last_login_ip;
      delete account.welcome_email_sent;
      return account;
    });
    download({
      name: 'rapidtest_accounts',
      ext: 'csv',
      data: toCsv(sanitizedAccounts),
    });
  };

  const doBatch = (archive) => {
    setIsLoading(true);
    const batch = accountsToDisable.map((id) => editAccount(id, { archive }));
    axios
      .all(batch)
      .then(async () => {
        setAccounts(await getAccountList());
        setAccountsToDisable([]);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Something went wrong!');
        setIsLoading(false);
      });
  };

  const handleBatchActivate = () => {
    doBatch(false);
  };

  const handleBatchDeactivate = () => {
    doBatch(true);
  };

  const sortNames = (a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  };

  const handleCheckChange = (res, isChecked) => {
    setAccountsToDisable(isChecked ? [] : res);
  };

  const cols = [
    {
      renderer: 'accountNameCell',
      header: 'Name',
      headerParams: {
        showCheck: true,
        handleCheckChange,
      },
      comparator: sortNames,
      value: ({ data }) => `${data.last_name}, ${data.first_name}`,
    },
    { field: 'email_address', header: 'Email' },
    { field: 'phone_number_office', header: 'Phone' },
    {
      value: ({ data }) => (data.archive ? 'Inactive' : 'Active'),
      header: 'Active',
      colWidth: 120,
    },
    {
      field: 'archive',
      renderer: 'disableAccountCell',
      header: 'Action',
      disableSort: true,
      colWidth: 120,
      resizable: false,
    },
    {
      renderer: 'editAccountCell',
      header: 'Edit',
      disableSort: true,
      colWidth: 50,
      resizable: false,
    },
  ];

  const renderers = {
    disableAccountCell: DisableAccountCell,
    accountNameCell: AccountNameCell,
    editAccountCell: EditAccountCell,
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getAccountList();

      if (!Array.isArray(data)) {
        setIsLoading(false);
        return setAccounts([]);
      }

      setAccounts(data);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table2
      rows={accounts}
      cols={cols}
      renderers={renderers}
      tableName="Manage Accounts"
      addButtonText={t('buttons.addAccount')}
      uploadButtonText={`+ ${t('buttons.uploadList')}`}
      addRoute={ROUTES.ADD_ACCOUNT.path}
      uploadRoute={ROUTES.UPLOAD_ACCOUNTS.path}
      isLoading={isLoading}
      onExportData={handleExportData}
      onActivate={handleBatchActivate}
      onDeactivate={handleBatchDeactivate}
    />
  );
};

export default Accounts;
