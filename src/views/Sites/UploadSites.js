// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';

import { ROUTES, VALID_SITE_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

const HeaderText = () => {
  const { REQUIRED, OPTIONAL } = VALID_SITE_COLUMNS;
  return (
    <>
      <p>Upload a CSV file with a list of sites to add to your program.</p>
      <div className="mt-2">
        Valid column names are:
        <aside className="font-mono text-xs">
          {[...REQUIRED, ...OPTIONAL].join(', ')}
        </aside>
      </div>
    </>
  );
};

const UploadSites = ({ history }) => {
  const [hasErrors, setHasErrors] = useState(false);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading sites...', { autoClose: false });
  };

  const update = (msg) => {
    toast.update(toastId.current, {
      render: msg,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      onClose: () => {
        history.push(ROUTES.SITES);
      },
    });
  };

  const handleUpload = (data) => {
    notify();

    for (let i = 0; i < data.length; i += 1) {
      const site = data[i];
      addSite(site).catch((err) => {
        const resp = err.response.data.errors;
        setHasErrors(true);
        for (const key in resp) {
          if (Object.hasOwnProperty.call(resp, key)) {
            const msg = resp[key];
            toast.error(msg, { autoClose: 10000 });
          }
        }
      });
    }

    if (!hasErrors) {
      update(`Uploaded ${data.length} sites!`);
    }
  };

  return (
    <>
      <PageHeader headline="Upload a list of sites" subtext={<HeaderText />} />
      <FileUpload
        validator={isValidSitesList}
        handleError={(e) => getSiteError(e)}
        handleUpload={handleUpload}
        templateFile={fileTemplate}
        templateName="rapidtest_sites_template.csv"
      />
    </>
  );
};

export default UploadSites;
