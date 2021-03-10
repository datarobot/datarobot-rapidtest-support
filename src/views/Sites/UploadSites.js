// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { addSite } from 'services/api';
import { isValidSitesList } from 'utils/validate';

import { ROUTES } from 'rt-constants';

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
      <PageHeader headline="Upload a list of sites" />
      <FileUpload validator={isValidSitesList} handleUpload={handleUpload} />
    </>
  );
};

export default UploadSites;
