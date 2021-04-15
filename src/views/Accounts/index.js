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
import { dateComparator } from 'utils/table';
import {
  DisableAccountCell,
  AccountAddedCell,
  AccountNameCell,
  AccountStatusCell,
  EditAccountCell,
  AccountEmailCell,
} from 'components/Table2/AccountRenderers';

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

  const sortStatus = (a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  };

  const statusValueGetter = ({ data }) => {
    if (data.archive) {
      return 'Inactive';
    }
    if (!data.last_login_ip) {
      return 'Email Sent';
    }

    return 'Active';
  };

  const handleCheckChange = (res, isChecked) => {
    setAccountsToDisable(isChecked ? [] : res);
  };

  const cols = [
    {
      renderer: 'accountNameCell',
      header: 'Name',
      colId: 'name',
      headerParams: {
        showCheck: true,
        handleCheckChange,
      },
      comparator: sortNames,
      value: ({ data }) => `${data.last_name}, ${data.first_name}`,
    },
    {
      field: 'email_address',
      header: 'Email',
      renderer: 'accountEmailCell',
    },
    {
      field: 'welcome_email_sent',
      header: 'Added',
      renderer: 'accountAddedCell',
      comparator: dateComparator,
      colWidth: 120,
    },
    {
      renderer: 'accountStatusCell',
      comparator: sortStatus,
      header: 'Status',
      colWidth: 200,
      value: statusValueGetter,
      headerParams: {
        textEnd: true,
      },
    },
    {
      field: 'archive',
      renderer: 'disableAccountCell',
      header: 'Action',
      headerParams: {
        textEnd: true,
      },
      disableSort: true,
      resizable: false,
      colWidth: 100,
    },
    {
      renderer: 'editAccountCell',
      header: 'Edit',
      disableSort: true,
      colWidth: 50,
      resizable: false,
    },
  ];

  const onFilter = ({ target }) => {
    let filtered;
    switch (target.value) {
      case 'active':
        filtered = accounts.filter((acc) => acc.archive === false);
        break;

      case 'inactive':
        filtered = accounts.filter((acc) => acc.archive === true);
        break;

      case 'pending':
        filtered = accounts.filter(
          (acc) => acc.last_login_ip === null && !acc.archive
        );
        break;

      default:
        filtered = accounts;
        break;
    }

    setAccounts(filtered);
  };

  const renderers = {
    accountAddedCell: AccountAddedCell,
    accountEmailCell: AccountEmailCell,
    accountNameCell: AccountNameCell,
    accountStatusCell: AccountStatusCell,
    disableAccountCell: DisableAccountCell,
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
      onFilter={onFilter}
      defaultSortCol="name"
      tableName="Manage Accounts"
      addButtonText={t('buttons.addAccount')}
      uploadButtonText={t('buttons.uploadList')}
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
