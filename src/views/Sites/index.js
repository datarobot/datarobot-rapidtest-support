/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import { getSiteList, editSite } from 'services/api';
import { ROUTES } from 'rt-constants';
import ToggleButton from 'components/ToggleButton';
import Icon from 'components/Icon';
import SuccessCheck from 'components/Notifications/SuccessCheck';
import SiteNameCell from 'components/Table2/SiteNameCell';
import DisableSiteCell from 'components/Table2/DisableSiteCell';
import Table2 from 'components/Table2';
import Modal from 'components/Modal';

import { download, toCsv } from 'utils';

import { sitesAtom } from 'store';

const SiteStatus = ({ values, row }) => {
  const [, setSites] = useAtom(sitesAtom);
  const [selected, setSelected] = useState(!values);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleToggle = (e) => {
    if (selected) {
      return setShowModal(true);
    }

    updateSite(e);
  };

  const updateSite = (e) => {
    setIsLoading(true);
    if (showModal) {
      setShowModal(false);
    }
    setSelected(!selected);
    editSite(row.original.id, { archive: !e })
      .then(async () => {
        const data = await getSiteList();
        setIsLoading(false);
        setIsSuccess(true);
        setSites(data);
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
    <>
      {row.original.id !== 3 && (
        <>
          <ReactTooltip id="toggle" effect="solid" />
          <div
            className="flex items-center"
            data-tip={selected ? 'Deactivate' : 'Activate'}
            data-for="toggle"
          >
            {isSuccess ? (
              <SuccessCheck />
            ) : (
              <ToggleButton
                defaultChecked={selected}
                disabled={isLoading}
                onChange={handleToggle}
              />
            )}
            <Modal
              show={showModal}
              title="Are you sure?"
              modalClassName="max-w-lg my-12"
              confirmButtonText="Yes, disable it"
              closeButtonText="No, keep it"
              handleClose={() => {
                setShowModal(false);
              }}
              confirmationAction={() => updateSite(!selected)}
            >
              <p className="p-16 text-center">
                Disabling this site will make it unavailable to users in the
                RapidTest app
              </p>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

const Sites = () => {
  const { t } = useTranslation();
  const [sites, setSites] = useAtom(sitesAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = () => {
    download({ name: 'rapidtest_sites', ext: 'csv', data: toCsv(sites) });
  };

  // eslint-disable-next-line no-unused-vars
  const columns = useMemo(
    () => [
      {
        Header: t('site.label.name'),
        accessor: 'site_name',
        Cell: ({ row }) => (
          <>
            {row.original.id !== 3 ? (
              <>
                <Link to={`${ROUTES.EDIT_SITE.path}/${row.original.id}`}>
                  <Icon
                    iconName="pencil-alt"
                    type="fal"
                    color="#5282cc"
                    className="mr-2"
                  />
                </Link>
                {row.values.site_name}
              </>
            ) : (
              <span className="ml-6">{row.values.site_name}</span>
            )}
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

  const sortNames = (a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  };

  const cols = [
    {
      renderer: 'siteNameCell',
      header: 'Name',
      comparator: sortNames,
      value: ({ data }) => data.site_name,
    },
    {
      header: 'Address',
      value: ({ data }) =>
        `${data.street}, ${data.city} ${data.state} ${data.zip}`,
    },
    {
      field: 'phone_number_office',
      header: 'Contact',
      value: ({ data }) => data.contact_name || '-',
      colWidth: 200,
    },
    {
      field: 'archive',
      renderer: 'disableSiteCell',
      header: 'Status',
      disableSort: true,
      colWidth: 120,
    },
  ];

  const renderers = {
    siteNameCell: SiteNameCell,
    disableSiteCell: DisableSiteCell,
  };

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
      <Table2
        rows={sites}
        cols={cols}
        renderers={renderers}
        tableName="Manage Sites"
        addButtonText={t('buttons.addAccount')}
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_SITE.path}
        uploadRoute={ROUTES.UPLOAD_SITES.path}
        isLoading={isLoading}
        onExportData={handleExportData}
        sortBy="name"
      />
      {/* <Table
        tableName="Manage Sites"
        columns={columns}
        data={sites}
        addButtonText={t('buttons.addSite')}
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_SITE.path}
        uploadRoute={ROUTES.UPLOAD_SITES.path}
        columnFilter="site_name"
        isLoading={isLoading}
        onExportData={handleExportData}
        sortBy="site_name"
      /> */}
    </div>
  );
};

export default Sites;
