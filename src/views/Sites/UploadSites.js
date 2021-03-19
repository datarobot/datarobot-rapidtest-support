// @ts-nocheck
import { Fragment, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';

import { ROUTES, VALID_SITE_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

import './Sites.css';

const HeaderText = () => {
  const { REQUIRED, OPTIONAL } = VALID_SITE_COLUMNS;
  return (
    <>
      <p>Upload a CSV file with a list of sites to add to your program.</p>
      <div className="mt-2">
        Valid column names are:
        <aside className="font-mono text-xs column-list">
          {REQUIRED.map((reqCol, i) => (
            <span key={i}>
              {reqCol}
              <sup>*</sup>,{' '}
            </span>
          ))}
          {OPTIONAL.map((optCol, i) => (
            <Fragment key={i}>
              {i !== OPTIONAL.length - 1 ? (
                <span>{optCol}, </span>
              ) : (
                <span>{optCol}</span>
              )}
            </Fragment>
          ))}
        </aside>
      </div>
    </>
  );
};

const UploadSites = ({ history }) => {
  // eslint-disable-next-line no-unused-vars
  const [hasErrors, setHasErrors] = useState(false);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading sites...', { autoClose: false });
  };

  const dismiss = () => toast.dismiss(toastId.current);

  const update = (msg, type, ...rest) => {
    toast.update(toastId.current, {
      render: msg,
      type,
      autoClose: 5000,
      onClose: () => {
        history.push(ROUTES.SITES.path);
      },
      ...rest,
    });
  };

  const handleUpload = (data) => {
    notify();
    let uploaded = 0;

    for (let i = 0; i < data.length; i += 1) {
      const site = data[i];
      if (hasErrors) {
        break;
      }

      addSite(site)
        // eslint-disable-next-line no-loop-func
        .then(() => {
          uploaded += 1;
        })
        .catch((err) => {
          const resp = err.response?.data.errors;
          setHasErrors(true);
          dismiss();
          for (const key in resp) {
            if (Object.hasOwnProperty.call(resp, key)) {
              const msg = resp[key];
              toast.error(`${site.site_name}: ${msg}`, { autoClose: 5000 });
            }
          }
        });
    }

    if (!hasErrors && uploaded === data.length) {
      update(`Uploaded ${data.length} sites!`, toast.TYPE.SUCCESS);
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
