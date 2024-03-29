// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import cls from 'classnames';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getAccountList, editAccount } from 'services/api';
import {
  accountsAtom,
  accountsToDisableAtom,
  accountIdsToDisableAtom,
  accountFilterAtom,
  accountsSidebarAtom,
} from 'rt-store';
import { download, toCsv } from 'utils';
import { dateComparator } from 'utils/table';
import useCurrentProgram from 'hooks/useCurrentProgram';
import { useResponsive } from 'hooks';

import LayoutV2 from 'components/Layouts/LayoutV2';
import IconButton from 'components/IconButton';
import TableAdvancedV2 from 'components/TableAdvancedV2';
import HighlightValueCell from 'components/TableAdvancedV2/HighlightValueCell';
import EmailCell from 'components/TableAdvancedV2/AccountRenderers/EmailCell';
import IdCell from 'components/TableAdvancedV2/AccountRenderers/IdCell';
import StatusCell from 'components/TableAdvancedV2/AccountRenderers/StatusCell';
import EditCell from 'components/TableAdvancedV2/AccountRenderers/EditCell';
import AccountMobileCell from 'components/TableMobile/AccountMobileCell';
import TableMobile from 'components/TableMobile';
import Dropdown from 'components/Dropdown';

import mailIcon from 'assets/images/icons/mail.svg';
import activateIcon from 'assets/images/icons/account-activate.svg';
import deactivateIcon from 'assets/images/icons/account-deactivate.svg';
import uploadIcon from 'assets/images/icons/upload.svg';
import exportIcon from 'assets/images/icons/export.svg';
import addIcon from 'assets/images/icons/add.svg';

import AccountsSidebar from './AccountsSidebar';

// const sortNames = (a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
//   return 0;
// };

// const sortStatus = (a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
//   return 0;
// };

const AccountsV2 = () => {
  const { t } = useTranslation();

  const [, setAccountsSidebar] = useAtom(accountsSidebarAtom);
  const { name: currentProgram } = useCurrentProgram();

  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [initialAccounts, setInitialAccounts] = useState([]);
  const [accountsToDisable, setAccountsToDisable] = useAtom(
    accountsToDisableAtom
  );
  const [accountIdsToDisable, setAccountIdsToDisable] = useAtom(
    accountIdsToDisableAtom
  );
  const [accountFilter, setAccountFilter] = useAtom(accountFilterAtom);
  const [isLoading, setIsLoading] = useState(true);
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

  const { isMobile } = useResponsive();
  const tableButtons = isMobile ? (
    <Dropdown>
      <IconButton
        v2
        label={t('buttons.uploadList')}
        image={uploadIcon}
        onClick={() => setAccountsSidebar({ mode: 'upload' })}
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
        onClick={() => setAccountsSidebar({ mode: 'add' })}
      />
      {(showResendEmail || showActivate || showDeactivate) && (
        <div className="separator"></div>
      )}
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
    </Dropdown>
  ) : (
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
          onClick={() => setAccountsSidebar({ mode: 'upload' })}
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
          onClick={() => setAccountsSidebar({ mode: 'add' })}
        />
      </span>
    </>
  );

  const statusValueGetter = ({ data }) => {
    if (data.archive) {
      return 'Inactive';
    }
    if (!data.last_login_ip) {
      return 'Pending';
    }

    return 'Active';
  };

  const renderers = {
    HighlightValueCell,

    IdCell,
    EmailCell,

    StatusCell,
    EditCell,
  };

  const cols = [
    {
      renderer: 'IdCell',
      headerParams: {
        showCheck: true,
        handleCheckChange,
      },
      colId: 'id',
      colWidth: 30,
    },
    {
      header: 'Name',
      colId: 'name',
      initialSort: 'asc',
      // comparator: sortNames,
      value: ({ data }) => `${data.last_name}, ${data.first_name}`,
      renderer: 'HighlightValueCell',
    },
    {
      field: 'email_address',
      header: 'Email',
      colId: 'email',
      renderer: 'EmailCell',
    },
    {
      header: 'Added',
      colId: 'added',
      comparator: dateComparator,
      value: ({ data: { welcome_email_sent } }) =>
        welcome_email_sent &&
        format(new Date(welcome_email_sent), 'MM-dd-yyyy'),
      renderer: 'HighlightValueCell',
      colWidth: 100,
    },
    {
      renderer: 'StatusCell',
      // comparator: sortStatus,
      header: 'Status',
      colId: 'status',
      colWidth: 100,
      value: statusValueGetter,
    },
    {
      renderer: 'EditCell',
      header: 'Edit',
      colId: 'nosort-edit',
      disableSort: true,
      colWidth: 56,
      resizable: false,
    },
  ];

  return (
    <LayoutV2 footerFixed={!isMobile}>
      <p className="mt-4 md:mt-8">
        {!isMobile && 'Your program: '}
        {currentProgram || '...'}
      </p>
      {isMobile ? (
        <TableMobile
          rows={accounts}
          cols={cols}
          cellRenderer={AccountMobileCell}
          tableName="Test Operators"
          isLoading={isLoading}
          handleCheckChange={handleCheckChange}
          tableButtons={tableButtons}
        />
      ) : (
        <TableAdvancedV2
          rows={accounts}
          cols={cols}
          renderers={renderers}
          tableName="Test Operators"
          isLoading={isLoading}
          tableButtons={tableButtons}
        />
      )}
      <AccountsSidebar />
    </LayoutV2>
  );
};

export default AccountsV2;
