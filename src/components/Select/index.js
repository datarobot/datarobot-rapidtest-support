// @ts-nocheck
import cls from 'classnames';
import './Select.css';

const Select = ({
  options = [],
  label,
  isRequired,
  name,
  value,
  className,
  onChange,
  placeholder,
  ...rest
}) => (
  <>
    {label && (
      <label
        className={cls('select-label', { required: isRequired })}
        htmlFor={name}
      >
        {label}
      </label>
    )}

    <select
      onChange={onChange}
      id={name}
      className={cls(className, 'select')}
      value={value}
      {...rest}
    >
      <option value="DEFAULT" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);

export default Select;
