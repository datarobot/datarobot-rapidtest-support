// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { getSiteList, editSite } from 'services/api';
import { ROUTES } from 'rt-constants';
import ToggleButton from 'components/ToggleButton';
import Icon from 'components/Icon';
import Table from 'components/Table';

import { download, toCsv } from 'utils';

import { sitesAtom } from 'store';

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
  const [sites, setSites] = useAtom(sitesAtom);
  const [isLoading, setIsLoading] = useState(false);

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
    []
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
        sortBy="site_name"
      />
    </div>
  );
};

export default Sites;
