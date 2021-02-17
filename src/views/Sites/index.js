// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t('common.table.name'),
        accessor: 'name',
      },
      {
        Header: t('common.table.address'),
        accessor: 'address',
        Cell: ({ cell: { value } }) => <SiteAddress values={value} />,
      },
      {
        Header: t('common.table.status'),
        accessor: 'enabled',
        Cell: ({ cell: { value } }) => <SiteStatus values={value} />,
      },
      {
        Header: t('common.table.contact'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        addButtonText={t('buttons.addSite')}
        uploadButtonText={t('buttons.uploadSite')}
        onAddClick={() => handleToggleModal('add')}
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
