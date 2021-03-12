// @ts-nocheck
import cls from 'classnames';

export const KIND = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  CLEAR: 'clear',
  OUTLINE: 'outline',
  LINK: 'link',
};

const Button = ({
  btnType = 'button',
  className,
  kind = KIND.DEFAULT,
  label,
  onClick,
  icon,
  ...rest
}) => (
  <button
    className={cls(`btn-${kind}`, className)}
    type={btnType}
    onClick={onClick}
    {...rest}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {label}
  </button>
);

export default Button;
