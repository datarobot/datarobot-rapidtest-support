// @ts-nocheck
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import cls from 'classnames';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import ValidColumns from 'components/ValidColumns';

import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';
import { parseError } from 'utils/errors';

import { ROUTES, VALID_ACCOUNT_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_accounts_template.csv';

const UploadAccounts = () => {
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
        history.push(ROUTES.ACCOUNTS.path);
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
      <PageHeader headline="Upload a list of accounts" />
      <p className={cls({ 'w-1/2': errors.length > 0 })}>
        Upload a CSV file with a list of accounts to add to your program.
      </p>
      <div className="w-3/5 mb-8">
        <ValidColumns
          validColumns={VALID_ACCOUNT_COLUMNS}
          errors={errors}
          clearErrors={() => setErrors([])}
        />
      </div>

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
