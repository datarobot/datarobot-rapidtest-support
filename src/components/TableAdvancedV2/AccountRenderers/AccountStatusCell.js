const AccountStatusCell = ({ data }) => {
  if (data.archive) {
    return <span className="flex justify-end mr-4">Inactive</span>;
  }
  if (!data.last_login_ip) {
    return <span className="flex justify-end mr-4 text-orange">Pending</span>;
  }

  return <span className="flex justify-end mr-4">Active</span>;
};

export default AccountStatusCell;
