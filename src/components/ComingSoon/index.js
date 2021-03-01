import cls from 'classnames';

const ComingSoon = ({ fullHeight }) => (
  <div
    className={cls(
      { 'full-height': fullHeight },
      'flex justify-center items-center'
    )}
  >
    <p className="headline">Coming soon!</p>
  </div>
);

export default ComingSoon;
