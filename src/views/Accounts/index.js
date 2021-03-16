/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { getAccountList, editAccount } from 'services/api';
import { ROUTES } from 'rt-constants';
import { accountsAtom } from 'store';

import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Table from 'components/Table';

import { download, toCsv } from 'utils';

const StatusCell = ({ val }) => {
  const { archive } = val;

  return archive ? 'Inactive' : 'Active';
};

const ActivateButton = ({ val }) => {
  const { t } = useTranslation();
  const { id, archive } = val;
  const [, setAccounts] = useAtom(accountsAtom);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAccountActive = () => {
    setIsLoading(true);
    editAccount(id, { ...val, archive: !archive }).then(async () => {
      const data = await getAccountList();
      toast.success('Successfully updated account!', {
        onClose: () => {
          setAccounts(data);
          setIsLoading(false);
        },
      });
    });
  };

  return (
    <>
      <button
        onClick={toggleAccountActive}
        className="text-blue-light py-0 px-2 focus:outline-none"
        type="button"
      >
        {isLoading ? (
          <Loading size={24} />
        ) : (
          <>{!archive ? t('buttons.deactivate') : t('buttons.activate')}</>
        )}
      </button>
    </>
  );
};

const Accounts = () => {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useAtom(accountsAtom);
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

  const columns = useMemo(
    () => [
      {
        Header: t('common.table.name'),
        id: 'name',
        sortType: (rowA, rowB) => {
          if (rowA.original.last_name > rowB.original.last_name) return 1;
          if (rowB.original.last_name > rowA.original.last_name) return -1;
          return 0;
        },
        accessor: (val) => (
          <>
            <Link to={`${ROUTES.EDIT_ACCOUNT}/${val.id}`} className="mr-2">
              <Icon
                iconName="pencil-alt"
                type="fal"
                color="#5282cc"
                className="cursor-pointer"
              />
            </Link>
            {val.last_name}, {val.first_name}
          </>
        ),
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
        sortType: (rowA, rowB) => {
          if (rowA.original.archive > rowB.original.archive) return -1;
          if (rowB.original.archive > rowA.original.archive) return 1;
          return 0;
        },
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
      // {
      //   Header: () => null,
      //   id: 'edit',
      //   Cell: ({ row }) => (
      //     <Link
      //       to={`${ROUTES.EDIT_ACCOUNT}/${row.original.id}`}
      //       className="flex justify-center"
      //     >
      //       <Icon
      //         iconName="pencil-alt"
      //         type="fal"
      //         color="#5282cc"
      //         className="cursor-pointer"
      //       />
      //     </Link>
      //   ),
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accounts]
  );

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
    <div>
      <Table
        tableName="Manage Accounts"
        columns={columns}
        data={accounts}
        addButtonText={t('buttons.addAccount')}
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_ACCOUNT}
        uploadRoute={ROUTES.UPLOAD_ACCOUNTS}
        isLoading={isLoading}
        onExportData={handleExportData}
        sortBy="name"
      />
    </div>
  );
};

export default Accounts;
