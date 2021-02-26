/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  // const [, setAccounts] = useAtom(accountsAtom);
  const { id, archive } = val;

  const isDisabled = archive;
  const cellText = isDisabled ? 'Inactive' : 'Active';

  return (
    <span>
      {cellText}

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

const ActivateButton = ({ val }) => {
  const { t } = useTranslation();
  const { id, archive } = val;
  const [accounts, setAccounts] = useAtom(accountsAtom);

  const toggleAccountActive = () => {
    editAccount(id, { ...val, archive: !archive }).then(async () => {
      // const data = await getAccountList();
      setAccounts([...accounts, { ...val, archive: !archive }]);
    });
  };

  return (
    <>
      <button
        onClick={toggleAccountActive}
        className="text-light-blue py-1 px-2"
        type="button"
      >
        {!archive ? t('buttons.deactivate') : t('buttons.activate')}
      </button>
    </>
  );
};

const Accounts = () => {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [, setCurrentAccount] = useAtom(currentAccountAtom);
  const [accountsToApprove, setAccountsToApprove] = useState([]);

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
        Header: () => <span className="w-full text-right mr-2">Action</span>,
        id: 'approve',
        disableSortBy: true,
        accessor: (val) => (
          <div className="flex justify-end">
            <ActivateButton val={val} />
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
