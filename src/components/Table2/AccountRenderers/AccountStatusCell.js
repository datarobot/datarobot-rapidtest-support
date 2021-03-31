const AccountStatusCell = ({ data }) => {
  if (data.archive) {
    return 'Inactive';
  }
  if (!data.last_login_ip) {
    return <span className="text-orange">Email Sent</span>;
  }

  return 'Active';
};

export default AccountStatusCell;
