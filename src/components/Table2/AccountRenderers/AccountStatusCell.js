import { editAccount } from 'services/api';

const AccountStatusCell = ({ data }) => {
  const resendEmail = () => {
    editAccount(data.id, { resend_email: true });
  };

  if (data.archive) {
    return <span className="flex justify-end mr-4">Inactive</span>;
  }
  if (!data.last_login_ip) {
    return (
      <span className="flex justify-end">
        <button
          onClick={resendEmail}
          className="btn-clear font-normal text-base py-1 px-4 text-orange text-right focus:outline-none"
          type="button"
        >
          Resend Email
        </button>
      </span>
    );
  }

  return <span className="flex justify-end mr-4">Active</span>;
};

export default AccountStatusCell;
