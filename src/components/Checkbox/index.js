// @ts-nocheck
import { forwardRef } from 'react';
import cls from 'classnames';

import './Checkbox.css';

const Checkbox = ({
  v2 = false,
  name,
  isChecked,
  isDisabled,
  onChange,
  label,
  labelClass,
  checkClass,
}) => (
  <div>
    <label
      className={cls('flex justify-start items-start', {
        checkboxDisabled: isDisabled,
      })}
    >
      <div className={cls('checkboxWrapper', checkClass, { v2, isChecked })}>
        <input
          type="checkbox"
          name={name}
          className={cls('checkbox opacity-0 absolute cursor-pointer', { v2 })}
          checked={isChecked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <svg
          className="fill-current w-2.5 h-2.5 text-green-500 pointer-events-none"
          viewBox="0 0 20 20"
        >
          <path fill="#fff" stroke="#fff" d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div className={cls('labelText', labelClass)}>{label}</div>
    </label>
  </div>
);

export const ControlledCheckbox = forwardRef(
  (
    { v2 = false, name, isChecked, isDisabled, onChange, label, labelClass },
    ref
  ) => (
    <div>
      <label
        className={cls('flex justify-start items-start', labelClass, {
          checkboxDisabled: isDisabled,
        })}
      >
        <div
          className={cls(
            'checkboxWrapper bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500',
            { v2 }
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            name={name}
            className={cls('checkbox opacity-0 absolute cursor-pointer', {
              v2,
            })}
            checked={isChecked}
            onChange={onChange}
            disabled={isDisabled}
          />
          <svg
            className="fill-current w-4 h-4 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path
              fill="#5282cc"
              stroke="#5282cc"
              d="M0 11l2-2 5 5L18 3l2 2L7 18z"
            />
          </svg>
        </div>
        <div className="labelText select-none cursor-pointer">{label}</div>
      </label>
    </div>
  )
);

export default Checkbox;
