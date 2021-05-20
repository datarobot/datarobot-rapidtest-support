// @ts-nocheck
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { VALID_ACCOUNT_COLUMNS } from 'rt-constants';
import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';
import { parseError } from 'utils/errors';

import FileUpload from 'components/FileUpload';
import UploadHeaderText from 'components/UploadHeaderText';

import fileTemplate from 'assets/static/rapidtest_accounts_template.csv';

import './AccountsV2.css';

const UploadAccountsV2 = () => {
  const [errors, setErrors] = useState([]);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading accounts...', {
      autoClose: false,
    });
  };

  const dismiss = () => toast.dismiss(toastId.current);

  const handleUpload = (data) => {
    notify();

    const batch = data.map((account) => addAccount(account));

    axios
      .all(batch)
      .then(() => {
        dismiss();
        toast.success(`Uploaded ${data.length} accounts!`, { autoClose: 5000 });
      })
      .catch((err) => {
        dismiss();
        const resp = err.response?.data.errors;
        setErrors((prevState) => [...prevState, parseError(resp)]);
      });
  };

  return (
    <>
      <h2>Upload a list of accounts</h2>
      <UploadHeaderText
        pageType="accounts"
        validColumns={VALID_ACCOUNT_COLUMNS}
        errors={errors}
        clearErrors={() => setErrors([])}
      />
      <FileUpload
        validator={isValidAccountList}
        handleError={(e) => getAccountError(e)}
        handleUpload={handleUpload}
        templateFile={fileTemplate}
        templateName="rapidtest_accounts_template.csv"
      />
    </>
  );
};

export default UploadAccountsV2;
