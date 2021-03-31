// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import cls from 'classnames';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import UploadHeaderText from 'components/UploadHeaderText';

import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';
import { parseError } from 'utils/errors';

import { ROUTES, VALID_ACCOUNT_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_accounts_template.csv';

const UploadAccounts = ({ history }) => {
  const [errors, setErrors] = useState([]);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading accounts...', {
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

    const batch = data.map((account) => addAccount(account));

    axios
      .all(batch)
      .then(() => {
        update(`Uploaded ${data.length} accounts!`, toast.TYPE.SUCCESS, {
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

export default UploadAccounts;
