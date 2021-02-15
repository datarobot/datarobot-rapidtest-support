// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { useAtom } from 'jotai';
import ReactTooltip from 'react-tooltip';

import { getAccountList, editAccount } from 'services/api';

import { accountsAtom } from 'store';

import EditAccountModal from 'components/Modals/EditAccount';
import Icon from 'components/Icon';
import Table from 'components/Table';

const StatusCell = ({ val }) => {
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
        Enable account
      </ReactTooltip>
      <ReactTooltip effect="solid" id="disable">
        Disable account
      </ReactTooltip>
      <ReactTooltip effect="solid" id="pending">
        Approval pending
      </ReactTooltip>
    </span>
  );
};

const ApproveButton = ({ onClick, val }) => {
  const { requestPending } = val;

  if (requestPending) {
    return (
      <button
        onClick={onClick}
        className="btn-primary text-xs py-1 px-2"
        type="button"
      >
        Approve
      </button>
    );
  }
  return <></>;
};

const ApproveAllButton = () => {
  const [accounts, setAccounts] = useAtom(accountsAtom);

  const approveAllAccounts = () => {
    const unapproved = accounts.filter(({ requestPending }) => requestPending);

    if (unapproved.length) {
      for (let i = 0; i < unapproved.length; i += 1) {
        const acc = unapproved[i];
        editAccount(acc.id, { ...acc, requestPending: false }).then(
          async () => {
            const data = await getAccountList();
            setAccounts(data);
          }
        );
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
        Approve All
      </button>
    </div>
  );
};

const Accounts = () => {
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [accountId, setAccountId] = useState();
  const [showModal, setShowModal] = useState(false);

  const approveAccount = (id, val) => {
    editAccount(id, { ...val, requestPending: false }).then(async () => {
      const data = await getAccountList();
      setAccounts(data);
    });
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSaveAccount = () => {
    getAccountList()
      .then((data) => {
        setAccounts(data);
      })
      .finally(() => {
        handleToggleModal();
      });
  };

  const handleEditRow = useCallback((id) => {
    setAccountId(id);
    handleToggleModal('edit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (val) => `${val.lastName}, ${val.firstName}`,
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Status',
        accessor: (val) => <StatusCell val={val} />,
      },
      {
        Header: 'Approved By',
        accessor: 'approvedBy',
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
          <div className="flex justify-center">
            <Icon
              iconName="pencil-alt"
              color="#5282cc"
              className="cursor-pointer"
              onClick={() => handleEditRow(parseInt(row.id, 10) + 1)}
            />
          </div>
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
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={accounts}
        addButtonText="+ Add a new account"
        uploadButtonText="+ Upload a list of accounts"
        onAddClick={handleToggleModal}
      />

      <EditAccountModal
        showModal={showModal}
        handleClose={() => handleToggleModal()}
        accountId={accountId}
        onSave={handleSaveAccount}
      />
    </div>
  );
};

export default Accounts;
