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
import Table from 'components/Table';
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
              handleClose={() => setShowModal(false)}
              title="Are you sure?"
              modalClassName="max-w-lg my-12"
              confirmButtonText="Yes, disable it"
              closeButtonText="No, keep it"
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
        addRoute={ROUTES.ADD_SITE.path}
        uploadRoute={ROUTES.UPLOAD_SITES.path}
        columnFilter="site_name"
        isLoading={isLoading}
        onExportData={handleExportData}
        sortBy="site_name"
      />
    </div>
  );
};

export default Sites;
