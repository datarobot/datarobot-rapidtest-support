// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';
import { parseError } from 'utils/errors';
import { VALID_SITE_COLUMNS } from 'rt-constants';

import FileUpload from 'components/FileUpload';
import UploadHeaderText from 'components/UploadHeaderText';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

import './SitesV2.css';

const UploadSitesV2 = () => {
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
      <h2>Upload a list of sites</h2>
      <p>
        <UploadHeaderText
          pageType="sites"
          validColumns={VALID_SITE_COLUMNS}
          errors={errors}
          clearErrors={() => setErrors([])}
        />
      </p>
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
