/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';

import { getAccountList, editAccount } from 'services/api';
import { ROUTES } from 'rt-constants';
import { accountsAtom, currentAccountAtom } from 'store';

import Icon from 'components/Icon';
import Table from 'components/Table';

const StatusCell = ({ val }) => {
  const { t } = useTranslation();
  const [, setAccounts] = useAtom(accountsAtom);
  const { id, requestPending, enabled } = val;

  const isDisabled = !enabled && !requestPending;

  let cellText;

  if (requestPending) {
    cellText = 'requested';
  } else {
    cellText = enabled ? 'enabled' : 'disabled';
  }

  const changeStatus = () => {
    if (requestPending) {
      return;
    }

    editAccount(id, { ...val, enabled: !enabled }).then(async () => {
      const data = await getAccountList();
      setAccounts(data);
    });
  };

  return (
    <span className="text-xs uppercase flex justify-between">
      {cellText}
      <Icon
        className={cls({ 'cursor-pointer': !requestPending })}
        data-tip
        data-for={enabled ? 'disable' : isDisabled ? 'enable' : 'pending'}
        onClick={changeStatus}
        size="lg"
        iconName={
          enabled
            ? 'times-circle'
            : isDisabled
            ? 'check-circle'
            : 'hourglass-half'
        }
        color={enabled ? '#Df472C' : isDisabled ? '#33a15e' : '#999'}
      />
      <ReactTooltip effect="solid" id="enable">
        {t('tooltips.enableAccount')}
      </ReactTooltip>
      <ReactTooltip effect="solid" id="disable">
        {t('tooltips.disableAccount')}
      </ReactTooltip>
      <ReactTooltip effect="solid" id="pending">
        {t('tooltips.requestPending')}
      </ReactTooltip>
    </span>
  );
};

const ApproveButton = ({ onClick, val }) => {
  const { t } = useTranslation();
  const { requestPending } = val;

  if (requestPending) {
    return (
      <button
        onClick={onClick}
        className="btn-primary text-xs py-1 px-2"
        type="button"
      >
        {t('buttons.approve')}
      </button>
    );
  }
  return <></>;
};

const ApproveAllButton = () => {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useAtom(accountsAtom);

  const approveAllAccounts = () => {
    const unapproved = accounts.filter(({ requestPending }) => requestPending);

    if (unapproved.length) {
      for (let i = 0; i < unapproved.length; i += 1) {
        const acc = unapproved[i];
        editAccount(acc.id, {
          ...acc,
          requestPending: false,
          enabled: true,
        }).then(async () => {
          const data = await getAccountList();
          setAccounts(data);
        });
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={approveAllAccounts}
        className="btn-primary text-xs py-1 px-2"
        type="button"
      >
        {t('buttons.approveAll')}
      </button>
    </div>
  );
};

const Accounts = () => {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [, setCurrentAccount] = useAtom(currentAccountAtom);
  const [accountsToApprove, setAccountsToApprove] = useState([]);

  const approveAccount = (id, val) => {
    editAccount(id, { ...val, requestPending: false, enabled: true }).then(
      async () => {
        const data = await getAccountList();
        setAccounts(data);
      }
    );
  };

  // const handleSaveAccount = () => {
  //   getAccountList()
  //     .then((data) => {
  //       setAccounts(data);
  //     })
  // };

  const handleCheckAccount = ({ target }) => {
    setAccountsToApprove((prevState) => [...prevState, target.value]);
  };

  const handleEditRow = useCallback((account) => {
    console.log(account);
    setCurrentAccount(account);
    // setAccountId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'approve-check',
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <input
              type="checkbox"
              value={row.original.id}
              onChange={handleCheckAccount}
            />
          </div>
        ),
      },
      {
        Header: t('common.table.name'),
        id: 'name',
        accessor: (val) => `${val.last_name}, ${val.first_name}`,
      },
      {
        Header: t('common.table.email'),
        id: 'email',
        accessor: ({ email_address }) => (
          <a href={`mailto:${email_address}`}>{email_address}</a>
        ),
      },
      {
        Header: t('common.table.phone'),
        accessor: 'phone_number_office',
      },
      {
        Header: t('common.table.status'),
        accessor: (val) => <StatusCell val={val} />,
      },
      {
        Header: () => <ApproveAllButton />,
        id: 'approve',
        disableSortBy: true,
        accessor: (val) => (
          <div className="flex justify-center">
            <ApproveButton
              onClick={() => approveAccount(val.id, val)}
              val={val}
            />
          </div>
        ),
      },
      {
        Header: () => null,
        id: 'edit',
        Cell: ({ row }) => (
          <Link
            to={ROUTES.EDIT_ACCOUNT}
            onClick={() => handleEditRow(row.original)}
            className="flex justify-center"
          >
            <Icon
              iconName="pencil-alt"
              color="#5282cc"
              className="cursor-pointer"
            />
          </Link>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    (async () => {
      const data = await getAccountList();
      setAccounts(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Table
        tableName="Manage Accounts"
        columns={columns}
        data={accounts}
        addButtonText={t('buttons.addAccount')}
        // "+ Add a new account"
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        // onAddClick={handleToggleModal}
        addRoute={ROUTES.ADD_ACCOUNT}
      />
    </div>
  );
};

export default Accounts;
