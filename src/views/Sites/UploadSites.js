// @ts-nocheck
import { Fragment, useRef, useState } from 'react';
import cls from 'classnames';
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

const HeaderText = ({ errors, clearErrors }) => {
  const { REQUIRED, OPTIONAL } = VALID_SITE_COLUMNS;

  if (errors.length > 0) {
    return (
      <section className="px-4 py-2 w-full">
        {errors.map((err, i) => (
          <p className="upload-error-message" key={i}>
            <span>
              <Icon iconName="exclamation-circle" />
              {err}
            </span>
            <button
              type="button"
              onClick={clearErrors}
              className="cursor-pointer text-black"
            >
              <Icon iconName="times" type="fal" />
            </button>
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
  const [errors, setErrors] = useState([]);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading sites...', {
      autoClose: false,
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
          onClose: () => {
            history.push(ROUTES.SITES.path);
          },
        });
      })
      .catch((err) => {
        dismiss();
        const resp = err.response?.data.errors;
        setErrors((prevState) => [...prevState, parseError(resp)]);
      });
  };

  return (
    <>
      <PageHeader
        headline="Upload a list of sites"
        subtext={
          <HeaderText errors={errors} clearErrors={() => setErrors([])} />
        }
        subtextClass={cls({ 'w-1/2': errors.length > 0 })}
      />
      <FileUpload
        validator={isValidSitesList}
        handleError={(e) => getSiteError(e)}
        handleUpload={handleUpload}
        templateFile={fileTemplate}
        templateName="rapidtest_sites_template.csv"
        clearErrors={() => setErrors([])}
      />
    </>
  );
};

export default UploadSites;
