/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { getAccountList, editAccount } from 'services/api';
import { ROUTES } from 'rt-constants';
import {
  accountsAtom,
  accountsToDisableAtom,
  accountIdsToDisableAtom,
  activeFilterAtom,
} from 'rt-store';

import TableAdvanced from 'components/TableAdvanced';

import { download, toCsv } from 'utils';
import { dateComparator } from 'utils/table';
import {
  AccountAddedCell,
  AccountNameCell,
  AccountStatusCell,
  EditAccountCell,
  AccountEmailCell,
} from 'components/TableAdvanced/AccountRenderers';

import { toast } from 'react-toastify';

const Accounts = () => {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [initialAccounts, setInitialAccounts] = useState([]);
  const [accountsToDisable, setAccountsToDisable] = useAtom(
    accountsToDisableAtom
  );
  const [accountIdsToDisable, setAccountIdsToDisable] = useAtom(
    accountIdsToDisableAtom
  );
  const [, setActiveFilter] = useAtom(activeFilterAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showActivate, setShowActivate] = useState(false);

  const accountsCopy = Array.from(accounts);

  const sanitizedAccounts = accountsCopy.map(
    ({ email_address, first_name, last_name, phone_number_office }) => ({
      email_address,
      first_name,
      last_name,
      phone_number_office,
    })
  );

  const handleExportData = () => {
    download({
      name: 'rapidtest_accounts',
      ext: 'csv',
      data: toCsv(sanitizedAccounts),
    });
  };

  const doBatch = (payload) => {
    setIsLoading(true);
    const batch = accountIdsToDisable.map((id) => editAccount(id, payload));
    axios
      .all(batch)
      .then(async () => {
        setAccounts(await getAccountList());
        setAccountIdsToDisable([]);
        setAccountsToDisable([]);
        toast.success('Email was successfully sent!');
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Something went wrong!');
        setIsLoading(false);
      });
  };

  const handleResendEmail = () => {
    doBatch({ resend_email: true });
  };

  const handleBatchActivate = () => {
    doBatch({ archive: false });
  };

  const handleBatchDeactivate = () => {
    doBatch({ archive: true });
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
      return 'Pending';
    }

    return 'Active';
  };

  const handleCheckChange = (res, isChecked) => {
    const accountIds = res.map(({ id }) => id);
    setAccountsToDisable(isChecked ? [] : res);
    setAccountIdsToDisable(isChecked ? [] : accountIds);
  };

  useEffect(() => {
    const showEmail = accountsToDisable.every((acc) => !acc.last_login_ip);
    const deactivate = accountsToDisable.every((acc) => !acc.archive);
    const activate = accountsToDisable.every((acc) => acc.archive);

    if (accountsToDisable.length > 0) {
      setShowResendEmail(showEmail);
      setShowActivate(activate);
      setShowDeactivate(deactivate);
    } else {
      setShowResendEmail(false);
      setShowActivate(false);
      setShowDeactivate(false);
    }
  }, [accountsToDisable]);

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
      renderer: 'editAccountCell',
      header: 'Edit',
      disableSort: true,
      colWidth: 50,
      resizable: false,
    },
  ];

  const onFilter = ({ target }) => {
    const { value } = target;
    let filtered;

    setActiveFilter(value);

    switch (value) {
      case 'active':
        filtered = initialAccounts.filter(
          (acc) => acc.archive === false && acc.last_login_ip
        );
        break;

      case 'inactive':
        filtered = initialAccounts.filter((acc) => acc.archive === true);
        break;

      case 'pending':
        filtered = initialAccounts.filter(
          (acc) => acc.last_login_ip === null && !acc.archive
        );
        break;

      default:
        filtered = initialAccounts;
        break;
    }

    setAccounts(filtered);
  };

  const onFilterReset = () => {
    setAccounts(initialAccounts);
    setActiveFilter();
  };

  const renderers = {
    accountAddedCell: AccountAddedCell,
    accountEmailCell: AccountEmailCell,
    accountNameCell: AccountNameCell,
    accountStatusCell: AccountStatusCell,
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
      setInitialAccounts(data);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableAdvanced
      rows={accounts}
      cols={cols}
      renderers={renderers}
      onFilter={onFilter}
      onFilterReset={onFilterReset}
      defaultSortCol="name"
      tableName="Manage Accounts"
      addButtonText={t('buttons.addAccount')}
      addButtonIcon="user-plus"
      uploadButtonText={t('buttons.uploadList')}
      addRoute={ROUTES.ADD_ACCOUNT.path}
      uploadRoute={ROUTES.UPLOAD_ACCOUNTS.path}
      isLoading={isLoading}
      onExportData={handleExportData}
      onActivate={handleBatchActivate}
      onDeactivate={handleBatchDeactivate}
      showResendEmail={showResendEmail}
      showActivate={showActivate}
      showDeactivate={showDeactivate}
      handleResendEmail={handleResendEmail}
    />
  );
};

export default Accounts;
