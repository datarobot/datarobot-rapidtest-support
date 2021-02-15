// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getSiteList } from 'services/api';

import AddSiteModal from 'components/Modals/AddSite';
import EditSiteModal from 'components/Modals/EditSite';
import Icon from 'components/Icon';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [siteId, setSiteId] = useState();

  const handleToggleModal = (modal) => {
    if (modal === 'add') {
      return setShowAddModal(!showAddModal);
    }

    return setShowEditModal(!showEditModal);
  };

  const handleEditRow = useCallback((id) => {
    setSiteId(id);
    handleToggleModal('edit');
  }, []);

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
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
          <Icon
            iconName="pencil-alt"
            color="#5282cc"
            onClick={() => handleEditRow(parseInt(row.id, 10) + 1)}
          />
        ),
      },
    ],
    [handleEditRow]
  );

  useEffect(() => {
    (async () => {
      const data = await getSiteList();
      setSites(data);
    })();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={sites}
        addButtonText="+ Add a site"
        uploadButtonText="+ Upload a list of sites"
        onAddClick={handleToggleModal}
      />
      <AddSiteModal
        showModal={showAddModal}
        handleClose={() => handleToggleModal('add')}
      />
      <EditSiteModal
        showModal={showEditModal}
        handleClose={() => handleToggleModal('edit')}
        siteId={siteId}
      />
    </div>
  );
};

export default Sites;
