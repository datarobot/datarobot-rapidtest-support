// @ts-nocheck
import { Fragment, useRef, useState } from 'react';
import cls from 'classnames';
import { toast } from 'react-toastify';
import axios from 'axios';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import UploadHeaderText from 'components/UploadHeaderText';

import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';
import { parseError } from 'utils/errors';

import { ROUTES, VALID_SITE_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

import './SitesV2.css';

const UploadSitesV2 = ({ history }) => {
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
          <UploadHeaderText
            pageType="sites"
            validColumns={VALID_SITE_COLUMNS}
            errors={errors}
            clearErrors={() => setErrors([])}
          />
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

export default UploadSitesV2;
