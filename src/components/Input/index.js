import React from 'react';
import cls from 'classnames';
import './Input.css';

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  rounded,
  ...rest
}) => (
  <input
    className={cls(className, 'input', { isRounded: rounded })}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    {...rest}
  />
);

export default Input;
