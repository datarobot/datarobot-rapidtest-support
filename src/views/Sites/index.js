// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';

import { getSiteList } from 'services/api';
import { ROUTES } from 'rt-constants';
import SiteNameCell from 'components/Table2/SiteNameCell';
import DisableSiteCell from 'components/Table2/DisableSiteCell';
import Table2 from 'components/Table2';

import { download, toCsv } from 'utils';

import { sitesAtom } from 'store';

const Sites = () => {
  const { t } = useTranslation();
  const [sites, setSites] = useAtom(sitesAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = () => {
    download({ name: 'rapidtest_sites', ext: 'csv', data: toCsv(sites) });
  };

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
    <div>
      <Table2
        rows={sites}
        cols={cols}
        renderers={renderers}
        tableName="Manage Sites"
        addButtonText={t('buttons.addSite')}
        uploadButtonText={`+ ${t('buttons.uploadList')}`}
        addRoute={ROUTES.ADD_SITE.path}
        uploadRoute={ROUTES.UPLOAD_SITES.path}
        isLoading={isLoading}
        onExportData={handleExportData}
      />
    </div>
  );
};

export default Sites;
