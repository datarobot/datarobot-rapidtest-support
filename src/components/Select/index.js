// @ts-nocheck
import { forwardRef } from 'react';
import cls from 'classnames';

const Select = forwardRef(
  (
    { options = [], onChange, className, label, isRequired, name, ...rest },
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
      <select
        ref={ref}
        onChange={onChange}
        id={name}
        className={cls(className, 'input')}
        {...rest}
      >
        <option value=""></option>
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
