// @ts-nocheck
import { forwardRef } from 'react';
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
  isRequired,
  ...rest
}) => (
  <>
    {label && (
      <label
        className={cls('input-label', { required: isRequired })}
        htmlFor={name}
      >
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

export const ControlledInput = forwardRef(
  (
    {
      name,
      label,
      type,
      value,
      placeholder,
      className,
      rounded,
      isRequired,
      ...rest
    },
    ref
  ) => (
    <>
      {label && (
        <label
          className={cls('input-label', { required: isRequired })}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        name={name}
        id={name}
        className={cls(className, 'input', { isRounded: rounded })}
        type={type}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </>
  )
);

export default Input;
