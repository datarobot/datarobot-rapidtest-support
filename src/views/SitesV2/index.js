/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getSiteList, editSite } from 'services/api';
import {
  sitesAtom,
  sitesToDisableAtom,
  siteIdsToDisableAtom,
  sitesSidebarAtom,
} from 'rt-store';
import { download, toCsv } from 'utils';
import useCurrentProgram from 'hooks/useCurrentProgram';
import { useResponsive } from 'hooks';

import LayoutV2 from 'components/Layouts/LayoutV2';
import Modal from 'components/Modal';
import { IconButton } from 'components/Button';
import TableMobile from 'components/TableMobile';
import TableAdvancedV2 from 'components/TableAdvancedV2';
import SiteNameCell from 'components/TableAdvancedV2/SiteRenderers/SiteNameCell';
import DisableSiteCell from 'components/TableAdvancedV2/SiteRenderers/DisableSiteCell';

import activateIcon from 'assets/images/icons/site-activate.svg';
import deactivateIcon from 'assets/images/icons/site-deactivate.svg';
import uploadIcon from 'assets/images/icons/upload.svg';
import exportIcon from 'assets/images/icons/export.svg';
import addIcon from 'assets/images/icons/add.svg';

import SitesSidebar from './SitesSidebar';

const SitesV2 = () => {
  const { t } = useTranslation();

  const [, setSitesSidebar] = useAtom(sitesSidebarAtom);
  const { name: currentProgram } = useCurrentProgram();

  const [sites, setSites] = useAtom(sitesAtom);
  const [sitesToDisable, setSitesToDisable] = useAtom(sitesToDisableAtom);
  const [siteIdsToDisable, setSiteIdsToDisable] = useAtom(siteIdsToDisableAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showActivate, setShowActivate] = useState(false);

  const sanitizedSites = sites.map(
    ({
      site_name,
      street,
      city,
      state,
      zip,
      county,
      clia,
      contact_name,
      contact_phone,
      contact_email,
      district,
      latitude,
      longitude,
      site_type,
    }) => ({
      site_name,
      street,
      city,
      state,
      zip,
      county,
      clia,
      contact_name,
      contact_phone,
      contact_email,
      district,
      latitude,
      longitude,
      site_type,
    })
  );

  const handleExportData = () => {
    download({
      name: 'rapidtest_sites',
      ext: 'csv',
      data: toCsv(sanitizedSites),
    });
  };

  const doBatch = (archive) => {
    setIsLoading(true);
    const batch = siteIdsToDisable.map((id) => editSite(id, { archive }));
    return axios.all(batch);
  };

  const handleBatchActivate = () => {
    doBatch(false)
      .then(async () => {
        setSites(await getSiteList());
        setIsLoading(false);
        setSitesToDisable([]);
      })
      .catch(() => {
        toast.error('Something went wrong!');
        setIsLoading(false);
      });
  };

  const handleBatchDeactivate = () => {
    doBatch(true)
      .then(async () => {
        setSites(await getSiteList());
        setIsLoading(false);
        setSitesToDisable([]);
      })
      .catch(() => {
        toast.error('Something went wrong!');
        setIsLoading(false);
      });
  };

  const sortNames = (a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  };

  const handleCheckChange = (res, isChecked) => {
    const siteIds = res.map(({ id }) => id);
    setSitesToDisable(isChecked ? [] : res);
    setSiteIdsToDisable(isChecked ? [] : siteIds);
  };

  useEffect(() => {
    const deactivate = sitesToDisable.every((acc) => !acc.archive);
    const activate = sitesToDisable.every((acc) => acc.archive);

    if (sitesToDisable.length > 0) {
      setShowActivate(activate);
      setShowDeactivate(deactivate);
    } else {
      setShowActivate(false);
      setShowDeactivate(false);
    }
  }, [sitesToDisable]);

  const cols = [
    {
      renderer: 'siteNameCell',
      header: 'Name',
      comparator: sortNames,
      headerParams: {
        showCheck: true,
        handleCheckChange,
      },
      colId: 'siteName',
      value: ({ data }) => data.site_name,
      // colWidth: 650,
    },
    {
      header: 'Address',
      value: ({ data }) =>
        `${data.street}, ${data.city} ${data.state} ${data.zip}`,
      // colWidth: 650,
    },
    {
      header: 'District',
      value: ({ data }) => data.district || '-',
      colWidth: 160,
    },
    {
      header: 'Contact',
      value: ({ data }) => data.contact_name || '-',
      colWidth: 160,
    },
    {
      field: 'archive',
      renderer: 'disableSiteCell',
      header: 'Status',
      disableSort: true,
      colWidth: 120,
    },
  ];

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

  const [showModal, setShowModal] = useState(false);
  const tableButtons = (
    <>
      <span className="flex">
        {showActivate && (
          <IconButton
            v2
            label="Activate"
            image={activateIcon}
            onClick={handleBatchActivate}
          />
        )}
        {showDeactivate && (
          <IconButton
            v2
            label="Deactivate"
            image={deactivateIcon}
            onClick={() => setShowModal(true)}
          />
        )}
        <Modal
          v2
          show={showModal}
          title="Are you sure?"
          modalClassName="max-w-lg my-12"
          confirmButtonText="Yes, disable them"
          closeButtonText="No, keep them"
          handleClose={() => {
            setShowModal(false);
          }}
          confirmationAction={() => {
            handleBatchDeactivate();
            setShowModal(false);
          }}
        >
          <p className="p-16 text-center">
            Disabling these sites will make it unavailable to users in the
            RapidTest app
          </p>
        </Modal>

        <span
          className={cls('flex', {
            'table-buttons-2': showActivate || showDeactivate,
          })}
        >
          <IconButton
            v2
            label={`+ ${t('buttons.uploadList')}`}
            image={uploadIcon}
            onClick={() => setSitesSidebar({ mode: 'upload' })}
          />
          <IconButton
            v2
            label="Export data"
            image={exportIcon}
            onClick={handleExportData}
          />
          <IconButton
            v2
            label={t('buttons.addSite')}
            image={addIcon}
            onClick={() => setSitesSidebar({ mode: 'add' })}
          />
        </span>
      </span>
    </>
  );

  const renderers = {
    siteNameCell: SiteNameCell,
    disableSiteCell: DisableSiteCell,
  };

  const { isMobile } = useResponsive();

  return (
    <LayoutV2 footerFixed={!isMobile}>
      <p className="mt-4 md:mt-8">
        {!isMobile && 'Your program: '}
        {currentProgram || '...'}
      </p>
      {isMobile ? (
        <TableMobile
          rows={sites}
          defaultSortCol="siteName"
          tableName="Sites"
          isLoading={isLoading}
        />
      ) : (
        <TableAdvancedV2
          rows={sites}
          cols={cols}
          defaultSortCol="siteName"
          renderers={renderers}
          tableName="Sites"
          isLoading={isLoading}
          tableButtons={tableButtons}
        />
      )}
      <SitesSidebar />
    </LayoutV2>
  );
};

export default SitesV2;
