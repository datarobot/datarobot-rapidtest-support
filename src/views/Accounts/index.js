// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

import { getAccountList } from 'services/api';

import Table from 'components/Table';

const StatusCell = ({ val }) => {
  const { requestPending, enabled } = val;
  if (requestPending) {
    return 'requested';
  }

  return enabled ? 'enabled' : 'disabled';
};

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

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
    ],
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
      <Table columns={columns} data={accounts} />
    </div>
  );
};

export default Accounts;
