// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';

import { ROUTES, VALID_ACCOUNT_COLUMNS } from 'rt-constants';

import fileTemplate from 'assets/static/rapidtest_accounts_template.csv';

const HeaderText = () => {
  const { REQUIRED, OPTIONAL } = VALID_ACCOUNT_COLUMNS;
  return (
    <>
      <p>
        Upload a CSV file with a list of test operator accounts to add to your
        program.
      </p>
      <div className="mt-2">
        Valid column names are:
        <aside className="font-mono text-xs">
          {[...REQUIRED, ...OPTIONAL].join(', ')}
        </aside>
      </div>
    </>
  );
};

const UploadAccounts = ({ history }) => {
  const [hasErrors, setHasErrors] = useState(false);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading accounts...', { autoClose: false });
  };

  const update = (msg) => {
    toast.update(toastId.current, {
      render: msg,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      onClose: () => {
        history.push(ROUTES.ACCOUNTS);
      },
    });
  };

  const handleUpload = (data) => {
    notify();

    for (let i = 0; i < data.length; i += 1) {
      const site = data[i];
      addAccount(site).catch((err) => {
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
      update(`Uploaded ${data.length} accounts!`);
    }
  };

  return (
    <>
      <PageHeader
        headline="Upload a list of accounts"
        subtext={<HeaderText />}
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
