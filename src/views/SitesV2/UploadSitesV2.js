// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { addSite } from 'services/api';
import { isValidSitesList, getSiteError } from 'utils/validate';
import { parseError } from 'utils/errors';
import { VALID_SITE_COLUMNS } from 'rt-constants';
import { sitesSidebarAtom } from 'rt-store';

import FileUpload from 'components/FileUpload';
import ValidColumns from 'components/ValidColumns';

import fileTemplate from 'assets/static/rapidtest_sites_template.csv';

import './SitesV2.css';
import { useAtom } from 'jotai';
import Button from '../../components/Button';

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

  const [, setSitesSidebar] = useAtom(sitesSidebarAtom);

  return (
    <>
      <h3>Upload a list of sites</h3>
      <p>Upload a CSV file with a list of sites to add to your program.</p>

      <FileUpload
        v2
        validator={(list) => {
          const valid = isValidSitesList(list);
          setSitesSidebar({ mode: 'upload', wide: valid });
          return valid;
        }}
        handleError={(e) => getSiteError(e)}
        handleUpload={handleUpload}
        templateFile={fileTemplate}
        templateName=".csv"
        clearErrors={() => {
          setSitesSidebar({ mode: 'upload', wide: false });
          setErrors([]);
        }}
      />
      <br />
      <ValidColumns
        validColumns={VALID_SITE_COLUMNS}
        errors={errors}
        clearErrors={() => {
          setSitesSidebar({ mode: 'upload', wide: false });
          setErrors([]);
        }}
      />

      <a
        href={fileTemplate}
        download="rapidtest_sites_template.csv"
        className="no-underline"
      >
        <Button v2 transparent small className="w-full mt-6">
          Download a template file
        </Button>
      </a>
    </>
  );
};

export default UploadSitesV2;
