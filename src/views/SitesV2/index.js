/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getSiteList, editSite, getPrograms } from 'services/api';
import { ROUTES } from 'rt-constants';
import { sitesAtom, sitesToDisableAtom, siteIdsToDisableAtom } from 'rt-store';
import { download, get, toCsv } from 'utils';

import LayoutV2 from 'components/Layouts/LayoutV2';
import TableAdvancedV2 from 'components/TableAdvancedV2';
import SiteNameCell from 'components/TableAdvancedV2/SiteRenderers/SiteNameCell';
import DisableSiteCell from 'components/TableAdvancedV2/SiteRenderers/DisableSiteCell';

const SitesV2 = () => {
  const { t } = useTranslation();

  const [currentProgram, setCurrentProgram] = useState('');
  useEffect(() => {
    const fetchCurrentProgram = async () => {
      const programs = await getPrograms();
      setCurrentProgram(programs[get('program')][0].name);
    };
    fetchCurrentProgram();
  }, []);

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
      headerParams: {
        showCheck: true,
        handleCheckChange,
      },
      colId: 'siteName',
      value: ({ data }) => data.site_name,
    },
    {
      header: 'Address',
      value: ({ data }) =>
        `${data.street}, ${data.city} ${data.state} ${data.zip}`,
      colWidth: 650,
    },
    {
      header: 'District',
      value: ({ data }) => data.district || '-',
      // colWidth: 200,
    },
    {
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
    <LayoutV2 footerFixed>
      <p className="mt-8">Your program: {currentProgram || '...'}</p>
      <TableAdvancedV2
        rows={sites}
        cols={cols}
        defaultSortCol="siteName"
        renderers={renderers}
        tableName="Sites"
        addButtonText={t('buttons.addSite')}
        addButtonIcon="building"
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_SITE_V2.path}
        uploadRoute={ROUTES.UPLOAD_SITES_V2.path}
        isLoading={isLoading}
        onExportData={handleExportData}
        onActivate={handleBatchActivate}
        onDeactivate={handleBatchDeactivate}
      />
    </LayoutV2>
  );
};

export default SitesV2;
