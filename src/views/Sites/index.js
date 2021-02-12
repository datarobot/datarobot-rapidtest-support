// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

import { getSiteList } from 'services/api';

import Table from 'components/Table';

const SiteAddress = ({ values }) => {
  const { street, city, state, zip } = values;
  return (
    <span>
      {street} {city}, {state} {zip}
    </span>
  );
};

const SiteStatus = ({ values }) => (values ? 'enabled' : 'disabled');

const Sites = () => {
  const [sites, setSites] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Address',
        accessor: 'address',
        Cell: ({ cell: { value } }) => <SiteAddress values={value} />,
      },
      {
        Header: 'Status',
        accessor: 'enabled',
        Cell: ({ cell: { value } }) => <SiteStatus values={value} />,
      },
      {
        Header: 'Contact',
        accessor: 'contact',
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const data = await getSiteList();
      setSites(data);
    })();
  }, []);

  return (
    <div>
      <Table columns={columns} data={sites} />
    </div>
  );
};

export default Sites;
