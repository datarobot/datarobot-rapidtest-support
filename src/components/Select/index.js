// @ts-nocheck
import { forwardRef } from 'react';
import cls from 'classnames';

import './Select.css';

const Select = forwardRef(
  (
    {
      v2,
      options = [],
      label,
      isRequired,
      name,
      value,
      className,
      onChange,
      placeholder,
      ...rest
    },
    ref
  ) => (
    <>
      {label && (
        <label
          className={cls('select-label', { required: isRequired, v2 })}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        onChange={onChange}
        id={name}
        className={cls(className, 'select', { v2 })}
        value={value || 'DEFAULT'}
        name={name}
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
  )
);

export default Select;
