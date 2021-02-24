// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';

import { getSiteList, editSite } from 'services/api';
import { ROUTES } from 'rt-constants';
import AddSiteModal from 'components/Modals/AddSite';
import EditSiteModal from 'components/Modals/EditSite';
import ToggleButton from 'components/ToggleButton';
import Icon from 'components/Icon';
import Table from 'components/Table';

import { sitesAtom, currentSiteAtom } from 'store';

const SiteStatus = ({ values, row }) => {
  const updateSite = (e) => {
    const site = { ...row.original, archive: e };
    editSite(site.id, site);
  };

  return <ToggleButton selected={!values} toggleSelected={updateSite} />;
};

const Sites = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [siteId, setSiteId] = useState();
  const [sites, setSites] = useAtom(sitesAtom);
  const [, setCurrentSite] = useAtom(currentSiteAtom);

  const handleToggleModal = (modal) => {
    if (modal === 'add') {
      return setShowAddModal(!showAddModal);
    }

    return setShowEditModal(!showEditModal);
  };

  const handleEditRow = useCallback((site) => {
    setSiteId(site.id);
    handleToggleModal('edit');
    setCurrentSite(site);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t('site.label.name'),
        accessor: 'site_name',
        Cell: ({ row }) => (
          <>
            <Link
              to={ROUTES.EDIT_SITE}
              onClick={() => handleEditRow(row.original)}
            >
              <Icon iconName="pencil-alt" color="#5282cc" className="mr-2" />
            </Link>
            {row.values.site_name}
          </>
        ),
      },
      {
        Header: t('common.table.address'),
        id: 'address',
        accessor: (val) => `${val.street}, ${val.city} ${val.state} ${val.zip}`,
      },
      {
        Header: t('common.table.contact'),
        accessor: 'contact_name',
        Cell: ({ row }) => <>{row.values.contact_name || '-'}</>,
      },
      {
        Header: t('common.table.status'),
        accessor: 'archive',
        Cell: ({ row, cell: { value } }) => (
          <SiteStatus values={value} row={row} />
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
  }, [setSites]);

  return (
    <div>
      <Table
        tableName="Manage Sites"
        columns={columns}
        data={sites}
        addButtonText={t('buttons.addSite')}
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_SITE}
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
