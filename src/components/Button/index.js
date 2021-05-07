// @ts-nocheck
import cls from 'classnames';

import IconButton from 'components/Button/IconButton';

import './Button.css';

export const KIND = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  CLEAR: 'clear',
  OUTLINE: 'outline',
  LINK: 'link',
};

const Button = ({
  v2 = false,
  primary,
  secondary,
  outline,
  transparent,
  link,
  small,
  type = 'button',
  className,
  kind,
  icon,
  label,
  children,
  ...rest
}) =>
  v2 ? (
    <button
      className={cls(className, 'btn-v2', {
        'btn-v2-small': small,
        'btn-v2-primary': primary,
        'btn-v2-secondary': secondary,
        'btn-v2-outline': outline,
        'btn-v2-transparent': transparent,
        'btn-v2-link': link,
      })}
      type={type}
      {...rest}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
      {children}
    </button>
  ) : (
    <button className={cls(`btn-${kind}`, className)} type={type} {...rest}>
      {icon && <span className="mr-1">{icon}</span>}
      {label}
      {children}
    </button>
  );

export { IconButton };

export default Button;
