// @ts-nocheck
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { addAccount } from 'services/api';
import { isValidAccountList, getAccountError } from 'utils/validate';
import { parseError } from 'utils/errors';

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
  // eslint-disable-next-line no-unused-vars
  const [hasErrors, setHasErrors] = useState(false);
  const toastId = useRef(null);

  const notify = () => {
    toastId.current = toast.info('Uploading accounts...', { autoClose: false });
  };

  const dismiss = () => toast.dismiss(toastId.current);

  const update = (msg, type, ...rest) => {
    toast.update(toastId.current, {
      render: msg,
      type,
      autoClose: 5000,
      onClose: () => {
        history.push(ROUTES.SITES.path);
      },
      ...rest,
    });
  };

  const handleUpload = (data) => {
    notify();
    let uploaded = 0;

    for (let i = 0; i < data.length; i += 1) {
      const account = data[i];
      if (hasErrors) {
        break;
      }

      addAccount(account)
        // eslint-disable-next-line no-loop-func
        .then(() => {
          uploaded += 1;
        })
        .catch((err) => {
          const resp = err.response?.data.errors;
          setHasErrors(true);
          dismiss();
          toast.error(
            <>
              <strong>
                {account.last_name}, {account.first_name}
              </strong>
              : {parseError(resp)}
            </>,
            {
              autoClose: 10000,
              onClose: () => {
                setHasErrors(false);
              },
            }
          );
        });
    }

    if (!hasErrors && uploaded === data.length) {
      update(`Uploaded ${data.length} accounts!`, toast.TYPE.SUCCESS);
      uploaded = 0;
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
