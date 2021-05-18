// @ts-nocheck
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import cls from 'classnames';

import { ROUTES, VALID_ACCOUNT_COLUMNS } from 'rt-constants';
import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';
import { parseError } from 'utils/errors';

import FileUpload from 'components/FileUpload';
import PageHeaderV2 from 'components/PageHeaderV2';
import UploadHeaderText from 'components/UploadHeaderText';

import fileTemplate from 'assets/static/rapidtest_accounts_template.csv';

import './AccountsV2.css';

const UploadAccountsV2 = () => {
  const history = useHistory();
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
        history.push(ROUTES.ACCOUNTS_V2.path);
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
      <PageHeaderV2
        headline="Upload a list of accounts"
        subtext={
          <UploadHeaderText
            pageType="accounts"
            validColumns={VALID_ACCOUNT_COLUMNS}
            errors={errors}
            clearErrors={() => setErrors([])}
          />
        }
        subtextClass={cls({ 'w-1/2': errors.length > 0 })}
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
