// @ts-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { getSiteList, editSite } from 'services/api';
import { ROUTES } from 'rt-constants';
import AddSiteModal from 'components/Modals/AddSite';
import EditSiteModal from 'components/Modals/EditSite';
import ToggleButton from 'components/ToggleButton';
import Icon from 'components/Icon';
import Table from 'components/Table';

import { download, toCsv } from 'utils';

import { sitesAtom, currentSiteAtom } from 'store';

const SiteStatus = ({ values, row }) => {
  const [, setSites] = useAtom(sitesAtom);
  const [selected, setSelected] = useState(!values);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const updateSite = (e) => {
    setIsLoading(true);
    const site = { ...row.original, archive: e };
    editSite(site.id, site)
      .then(async () => {
        const data = await getSiteList();
        setIsLoading(false);
        toast.success('Site updated successfully!', {
          onClose: () => {
            setSites(data);
          },
        });
      })
      .catch(() => {
        setSelected(!selected);
        toast.error('There was a problem updating the site.', {
          onClose: () => {
            setSelected(!selected);
            setIsLoading(false);
          },
        });
      });
  };

  return (
    <ToggleButton
      defaultChecked={selected}
      disabled={isLoading}
      onChange={() => {
        updateSite(!selected);
        setSelected(!selected);
      }}
    />
  );
};

const Sites = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [siteId, setSiteId] = useState();
  const [sites, setSites] = useAtom(sitesAtom);
  const [, setCurrentSite] = useAtom(currentSiteAtom);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleExportData = () => {
    download({ name: 'rapidtest_sites', ext: 'csv', data: toCsv(sites) });
  };

  const columns = useMemo(
    () => [
      {
        Header: t('site.label.name'),
        accessor: 'site_name',
        Cell: ({ row }) => (
          <>
            <Link to={`${ROUTES.EDIT_SITE}/${row.original.id}`}>
              <Icon
                iconName="pencil-alt"
                type="fal"
                color="#5282cc"
                className="mr-2"
              />
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
          <div className="flex items-center">
            <SiteStatus values={value} row={row} />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleEditRow]
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getSiteList();

      if (!Array.isArray(data)) {
        setIsLoading(false);
        return setSites([]);
      }

      setSites(data);
      setIsLoading(false);
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
        uploadRoute={ROUTES.UPLOAD_SITES}
        columnFilter="site_name"
        isLoading={isLoading}
        onExportData={handleExportData}
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
