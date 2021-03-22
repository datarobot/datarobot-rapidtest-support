import cls from 'classnames';

import './SuccessCheck.css';

const SuccessCheck = ({ persist, size = 26, onAnimationEnd }) => (
  <svg
    className={cls('success-check', { persist })}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    style={{ width: size, height: size }}
  >
    <circle
      className="success-check__circle"
      cx={size}
      cy={size}
      r={25}
      fill="none"
      onAnimationEnd={onAnimationEnd}
    />
    <path
      className="success-check__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
);

export default SuccessCheck;
