import Highlight from 'components/Highlight';

const EmailCell = ({ data }) => {
  return (
    <a href={`mailto:${data.email_address}`}>
      <Highlight text={data.email_address} />
    </a>
  );
};

export default EmailCell;
