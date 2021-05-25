// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { VALID_ACCOUNT_COLUMNS } from 'rt-constants';
import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';
import { parseError } from 'utils/errors';
import { accountsSidebarAtom } from 'rt-store';

import FileUpload from 'components/FileUpload';
import ValidColumns from 'components/ValidColumns';

import fileTemplate from 'assets/static/rapidtest_accounts_template.csv';

import './AccountsV2.css';
import { useAtom } from 'jotai';
import Button from '../../components/Button';

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

  const [, setAccountsSidebar] = useAtom(accountsSidebarAtom);

  return (
    <>
      <h3>Upload a list of accounts</h3>
      <p>Upload a CSV file with a list of accounts to add to your program.</p>

      <FileUpload
        v2
        validator={(list) => {
          const valid = isValidAccountList(list);
          console.log({ valid });
          setAccountsSidebar({ mode: 'upload', wide: valid });
          return valid;
        }}
        handleError={(e) => getAccountError(e)}
        handleUpload={handleUpload}
        templateFile={fileTemplate}
        templateName="rapidtest_accounts_template.csv"
        clearErrors={() => {
          setAccountsSidebar({ mode: 'upload', wide: false });
          setErrors([]);
        }}
      />
      <br />
      <ValidColumns
        validColumns={VALID_ACCOUNT_COLUMNS}
        errors={errors}
        clearErrors={() => {
          setAccountsSidebar({ mode: 'upload', wide: false });
          setErrors([]);
        }}
      />

      <a
        href={fileTemplate}
        download="rapidtest_accounts_template.csv"
        className="no-underline"
      >
        <Button v2 transparent small className="w-full mt-6">
          Download a template file
        </Button>
      </a>
    </>
  );
};

export default UploadAccountsV2;
