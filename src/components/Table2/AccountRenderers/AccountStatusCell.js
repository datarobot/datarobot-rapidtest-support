import { useState } from 'react';
import cls from 'classnames';
import { editAccount } from 'services/api';

import Loading from 'components/Loading';

const AccountStatusCell = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const resendEmail = () => {
    setIsLoading(true);

    editAccount(data.id, { resend_email: true }).then(() =>
      setIsLoading(false)
    );
  };

  if (data.archive) {
    return <span className="flex justify-end mr-4">Inactive</span>;
  }
  if (!data.last_login_ip) {
    return (
      <span
        className={cls('flex', {
          'justify-end': !isLoading,
          'justify-center': isLoading,
        })}
      >
        {isLoading ? (
          <Loading containerClassName="w-8" size={32} />
        ) : (
          <button
            onClick={resendEmail}
            className="btn-clear font-normal text-base py-1 px-4 text-orange text-right focus:outline-none"
            type="button"
          >
            Resend Email
          </button>
        )}
      </span>
    );
  }

  return <span className="flex justify-end mr-4">Active</span>;
};

export default AccountStatusCell;
