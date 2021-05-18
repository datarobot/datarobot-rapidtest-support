import cls from 'classnames';

const ComingSoon = ({ v2, fullHeight }) => (
  <div
    className={cls(
      { 'full-height': fullHeight },
      'flex justify-center items-center'
    )}
  >
    {v2 ? <h2>Coming soon!</h2> : <p className="headline">Coming soon!</p>}
  </div>
);

export default ComingSoon;
