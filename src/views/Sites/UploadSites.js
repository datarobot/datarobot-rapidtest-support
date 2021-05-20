// @ts-nocheck
import { Fragment, useRef, useState } from 'react';
import cls from 'classnames';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import ValidColumns from 'components/ValidColumns';

import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';
import { parseError } from 'utils/errors';

import { ROUTES, VALID_SITE_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

import './Sites.css';

const UploadSites = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading sites...', {
      autoClose: false,
    });
  };

  const dismiss = () => toast.dismiss(toastId.current);

  const handleUpload = (data) => {
    notify();

    const batch = data.map((site) => addSite(site));

    axios
      .all(batch)
      .then(() => {
        dismiss();
        history.push(ROUTES.SITES.path);
        toast.success(`Uploaded ${data.length} sites!`, {
          autoClose: 5000,
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
          <p>Upload a CSV file with a list of sites to add to your program.</p>
        }
        subtextClass={cls({ 'w-1/2': errors.length > 0 })}
      />
      <ValidColumns
        validColumns={VALID_SITE_COLUMNS}
        errors={errors}
        clearErrors={() => setErrors([])}
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
