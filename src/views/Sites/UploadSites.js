// @ts-nocheck
import { Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import Icon from 'components/Icon';

import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';
import { parseError } from 'utils/errors';

import { ROUTES, VALID_SITE_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

import './Sites.css';

const HeaderText = ({ errors }) => {
  const { REQUIRED, OPTIONAL } = VALID_SITE_COLUMNS;

  if (errors.length > 0) {
    return (
      <section className="bg-dark-red rounded px-4 py-2 w-full">
        <p className="text-white font-black text-lg uppercase w-full mb-2 border-b border-white">
          <Icon iconName="exclamation-circle" /> Error(s)
        </p>
        {errors.map((err, i) => (
          <p className="upload-error-message" key={i}>
            {err}
          </p>
        ))}
      </section>
    );
  }

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
  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState([]);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading sites...', {
      autoClose: false,
      onClose: () => {
        history.push(ROUTES.SITES.path);
      },
    });
  };

  const dismiss = () => toast.dismiss(toastId.current);

  const update = (msg, type, { ...rest }) => {
    toast.update(toastId.current, {
      render: msg,
      type,
      ...rest,
    });
  };

  const handleUpload = (data) => {
    notify();

    const batch = data.map((site) => addSite(site));

    axios
      .all(batch)
      .then(() => {
        update(`Uploaded ${data.length} sites!`, toast.TYPE.SUCCESS, {
          autoClose: 5000,
        });
      })
      .catch((err) => {
        const resp = err.response?.data.errors;
        dismiss();
          const resp = err.response?.data.errors;
          setErrors((prevState) => [...prevState, parseError(resp)]);
          setHasErrors(true);
          dismiss();
        update(parseError(resp), toast.TYPE.ERROR, {
          autoClose: 10000,
          onClose: () => {},
        });
      });
  };

  return (
    <>
      <PageHeader
        headline="Upload a list of sites"
        subtext={<HeaderText errors={errors} />}
      />
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
