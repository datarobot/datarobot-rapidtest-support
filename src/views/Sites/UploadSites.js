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

import './Sites.css';

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

export default UploadSites;
