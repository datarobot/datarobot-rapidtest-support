// @ts-nocheck
import cls from 'classnames';
import Icon from 'components/Icon';

const IconButton = ({
  v2 = false,
  btnType = 'button',
  className,
  label,
  onClick,
  image,
  icon,
  iconType = 'fas',
  isDisabled,
  ...rest
}) => (
  <div className="btn-icon-container">
    <button
      className={cls('btn-icon items-center', className, { v2 })}
      type={btnType}
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      {image && <img className="icon" src={image} alt="" />}
      {icon && (
        <span className="icon">
          <Icon iconName={icon} type={iconType} />
        </span>
      )}
      {label && <span className="btn-text">{label}</span>}
    </button>
  </div>
);

export default IconButton;
