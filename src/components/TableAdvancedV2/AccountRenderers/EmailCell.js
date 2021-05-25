import Highlight from 'components/Highlight';

const EmailCell = ({ value }) => {
  return (
    <a href={`mailto:${value}`}>
      <Highlight text={value} />
    </a>
  );
};

export default EmailCell;
