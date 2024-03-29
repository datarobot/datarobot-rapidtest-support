// @ts-nocheck
import { forwardRef } from 'react';
import cls from 'classnames';
import './Textarea.css';

const Textarea = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  rounded,
  isRequired,
  rows = 3,
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
    <textarea
      name={name}
      id={name}
      className={cls(className, 'input', { isRounded: rounded })}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      {...rest}
    >
      {value}
    </textarea>
  </>
);

export const ControlledTextarea = forwardRef(
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
      rows = 3,
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
      <textarea
        ref={ref}
        name={name}
        id={name}
        className={cls(className, 'input', { isRounded: rounded })}
        type={type}
        placeholder={placeholder}
        rows={rows}
        {...rest}
      >
        {value}
      </textarea>
    </>
  )
);

export default Textarea;
