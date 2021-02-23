// @ts-nocheck
import { forwardRef } from 'react';
import cls from 'classnames';

import './Select.css';

const Select = forwardRef(
  (
    {
      options = [],
      onChange,
      className,
      label,
      isRequired,
      name,
      placeholder = '',
      ...rest
    },
    ref
  ) => (
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
        ref={ref}
        onChange={onChange}
        id={name}
        className={cls(className, 'select')}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
);

export default Select;
