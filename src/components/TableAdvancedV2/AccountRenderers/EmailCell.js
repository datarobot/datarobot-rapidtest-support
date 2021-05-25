import Highlight from 'components/Highlight';

const EmailCell = ({ value }) => {
  return value ? (
    <a href={`mailto:${value}`}>
      <Highlight text={value} />
    </a>
  ) : (
    <span>-</span>
  );
};

export default EmailCell;
