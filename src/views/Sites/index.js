/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';

import { getSiteList, editSite } from 'services/api';
import { ROUTES } from 'rt-constants';
import SiteNameCell from 'components/TableAdvanced/SiteRenderers/SiteNameCell';
import DisableSiteCell from 'components/TableAdvanced/SiteRenderers/DisableSiteCell';
import TableAdvanced from 'components/TableAdvanced';

import { download, toCsv } from 'utils';

import { sitesAtom, sitesToDisableAtom, siteIdsToDisableAtom } from 'rt-store';

const Sites = () => {
  const { t } = useTranslation();
  const [sites, setSites] = useAtom(sitesAtom);
  const [, setSitesToDisable] = useAtom(sitesToDisableAtom);
  const [siteIdsToDisable, setSiteIdsToDisable] = useAtom(siteIdsToDisableAtom);
  const [isLoading, setIsLoading] = useState(false);

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

  const cols = [
    {
      renderer: 'siteNameCell',
      header: 'Name',
      comparator: sortNames,
      initialSort: 'asc',
      headerParams: {
        showCheck: true,
        handleCheckChange,
      },
      colId: 'siteName',
      value: ({ data }) => data.site_name,
    },
    {
      header: 'Address',
      colId: 'address',
      value: ({ data }) =>
        `${data.street}, ${data.city} ${data.state} ${data.zip}`,
      colWidth: 650,
    },
    {
      header: 'District',
      colId: 'district',
      value: ({ data }) => data.district || '-',
      // colWidth: 200,
    },
    {
      header: 'Contact',
      colId: 'contact',
      value: ({ data }) => data.contact_name || '-',
      colWidth: 200,
    },
    {
      field: 'archive',
      renderer: 'disableSiteCell',
      header: 'Status',
      colId: 'nosort-status',
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

  const renderers = {
    siteNameCell: SiteNameCell,
    disableSiteCell: DisableSiteCell,
  };

  return (
    <div>
      <TableAdvanced
        rows={sites}
        cols={cols}
        defaultSortCol="siteName"
        renderers={renderers}
        tableName="Manage Sites"
        addButtonText={t('buttons.addSite')}
        addButtonIcon={faBuilding}
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_SITE.path}
        uploadRoute={ROUTES.UPLOAD_SITES.path}
        isLoading={isLoading}
        onExportData={handleExportData}
        onActivate={handleBatchActivate}
        onDeactivate={handleBatchDeactivate}
      />
    </div>
  );
};

export default Sites;
