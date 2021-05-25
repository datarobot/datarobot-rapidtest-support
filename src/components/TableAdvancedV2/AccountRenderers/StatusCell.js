const StatusCell = ({ data }) => {
  if (data.archive) {
    return <span className="status inactive">Inactive</span>;
  }
  if (!data.last_login_ip) {
    return <span className="status pending">Pending</span>;
  }

  return <span className="status active">Active</span>;
};

export default StatusCell;
