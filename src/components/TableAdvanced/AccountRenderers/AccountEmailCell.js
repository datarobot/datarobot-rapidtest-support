const AccountEmailCell = ({ data }) => (
  <a href={`mailto:${data.email_address}`}>{data.email_address}</a>
);

export default AccountEmailCell;
