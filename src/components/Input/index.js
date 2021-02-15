import React from 'react';
import cls from 'classnames';
import './Input.css';

const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  rounded,
  ...rest
}) => (
  <>
    {label && (
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      name={name}
      id={name}
      className={cls(className, 'input', { isRounded: rounded })}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  </>
);

export default Input;
