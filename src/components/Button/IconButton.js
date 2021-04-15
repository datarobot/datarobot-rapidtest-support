// @ts-nocheck
import cls from 'classnames';
import Icon from 'components/Icon';

const IconButton = ({
  btnType = 'button',
  className,
  label,
  onClick,
  icon,
  iconType = 'fas',
  isDisabled,
  ...rest
}) => (
  <div className="btn-icon-container">
    <button
      className={cls('btn-icon', className)}
      type={btnType}
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      <span className="icon">
        <Icon iconName={icon} type={iconType} />
      </span>
      {label && <span className="btn-text">{label}</span>}
    </button>
  </div>
);

export default IconButton;
