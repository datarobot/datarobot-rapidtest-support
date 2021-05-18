/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import cls from 'classnames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getAccountList, editAccount, getPrograms } from 'services/api';
import { ROUTES } from 'rt-constants';
import {
  accountsAtom,
  accountsToDisableAtom,
  accountIdsToDisableAtom,
  accountFilterAtom,
} from 'rt-store';
import { download, get, toCsv } from 'utils';
import { dateComparator } from 'utils/table';

import LayoutV2 from 'components/Layouts/LayoutV2';
import { IconButton } from 'components/Button';
import TableAdvancedV2 from 'components/TableAdvancedV2';
import {
  AccountAddedCell,
  AccountNameCell,
  AccountStatusCell,
  EditAccountCell,
  AccountEmailCell,
} from 'components/TableAdvancedV2/AccountRenderers';

import mailIcon from 'assets/images/icons/mail.svg';
import activateIcon from 'assets/images/icons/account-activate.svg';
import deactivateIcon from 'assets/images/icons/account-deactivate.svg';
import uploadIcon from 'assets/images/icons/upload.svg';
import exportIcon from 'assets/images/icons/export.svg';
import addIcon from 'assets/images/icons/add.svg';

const AccountsV2 = () => {
  const { t } = useTranslation();

  const [currentProgram, setCurrentProgram] = useState('');
  useEffect(() => {
    const fetchCurrentProgram = async () => {
      const programs = await getPrograms();
      setCurrentProgram(programs[get('program')][0].name);
    };
    fetchCurrentProgram();
  }, []);

  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [initialAccounts, setInitialAccounts] = useState([]);
  const [accountsToDisable, setAccountsToDisable] = useAtom(
    accountsToDisableAtom
  );
  const [accountIdsToDisable, setAccountIdsToDisable] = useAtom(
    accountIdsToDisableAtom
  );
  const [accountFilter, setAccountFilter] = useAtom(accountFilterAtom);
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
      colWidth: 100,
      value: statusValueGetter,
      headerParams: {
        // textEnd: true,
      },
    },
    {
      renderer: 'editAccountCell',
      header: 'Edit',
      disableSort: true,
      colWidth: 56,
      resizable: false,
    },
  ];

  useEffect(() => {
    switch (accountFilter) {
      case 'active':
        setAccounts(
          initialAccounts.filter(
            (acc) => acc.archive === false && acc.last_login_ip
          )
        );
        break;

      case 'inactive':
        setAccounts(initialAccounts.filter((acc) => acc.archive === true));
        break;

      case 'pending':
        setAccounts(
          initialAccounts.filter(
            (acc) => acc.last_login_ip === null && !acc.archive
          )
        );
        break;

      default:
        setAccounts(initialAccounts);
        break;
    }
  }, [accountFilter]);

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

  const history = useHistory();
  const tableButtons = (
    <>
      {showResendEmail && (
        <IconButton
          v2
          label="Re-send email"
          image={mailIcon}
          onClick={handleResendEmail}
        />
      )}
      {showActivate && (
        <IconButton
          v2
          label="Activate user(s)"
          image={activateIcon}
          onClick={handleBatchActivate}
        />
      )}
      {showDeactivate && (
        <IconButton
          v2
          label="Deactivate user(s)"
          image={deactivateIcon}
          onClick={handleBatchDeactivate}
        />
      )}

      <span
        className={cls('flex', {
          'table-buttons-2': showResendEmail || showActivate || showDeactivate,
        })}
      >
        <IconButton
          v2
          label={t('buttons.uploadList')}
          image={uploadIcon}
          onClick={() => history.push(ROUTES.UPLOAD_ACCOUNTS_V2.path)}
        />
        <IconButton
          v2
          label="Export data"
          image={exportIcon}
          onClick={handleExportData}
        />
        <IconButton
          v2
          label={t('buttons.addAccount')}
          image={addIcon}
          onClick={() => history.push(ROUTES.ADD_ACCOUNT_V2.path)}
        />
      </span>
    </>
  );

  return (
    <LayoutV2 footerFixed>
      <p className="mt-8">Your program: {currentProgram || '...'}</p>
      <TableAdvancedV2
        rows={accounts}
        cols={cols}
        renderers={renderers}
        defaultSortCol="name"
        tableName="Test Operators"
        isLoading={isLoading}
        tableButtons={tableButtons}
      />
    </LayoutV2>
  );
};

export default AccountsV2;
