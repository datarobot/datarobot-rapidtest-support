import { format } from 'date-fns';

const AccountAddedCell = ({ data }) => (
  <>
    {data.welcome_email_sent
      ? format(new Date(data.welcome_email_sent), 'MM-dd-yyyy')
      : '-'}
  </>
);

export default AccountAddedCell;
