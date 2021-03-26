// @ts-nocheck
import { Fragment, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

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
        <aside className="font-mono text-xs column-list">
          {REQUIRED.map((reqCol, i) => (
            <span key={i}>
              {reqCol}
              <sup>*</sup>,{' '}
            </span>
          ))}
          {OPTIONAL.map((optCol, i) => (
            <Fragment key={i}>
              {i !== OPTIONAL.length - 1 ? (
                <span>{optCol}, </span>
              ) : (
                <span>{optCol}</span>
              )}
            </Fragment>
          ))}
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
    toastId.current = toast.info('Uploading accounts...', {
      autoClose: false,
      onClose: () => {
        history.push(ROUTES.ACCOUNTS.path);
      },
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
        });
      })
      .catch((err) => {
        const resp = err.response?.data.errors;
        dismiss();
        update(parseError(resp), toast.TYPE.ERROR, {
          autoClose: 10000,
          onClose: () => {},
        });
      });
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
