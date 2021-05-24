import Highlight from 'components/Highlight';

const AccountNameCell = ({ data }) => {
  return <Highlight text={`${data.last_name}, ${data.first_name}`} />;
};

export default AccountNameCell;
