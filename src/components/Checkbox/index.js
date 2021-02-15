import React from 'react';
import cls from 'classnames';

import './Checkbox.css';

const Checkbox = ({ isChecked, isDisabled, onChange, label, labelClass }) => (
  <div>
    <label
      className={cls('flex justify-start items-start', labelClass, {
        checkboxDisabled: isDisabled,
      })}
    >
      <div className="checkboxWrapper bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input
          type="checkbox"
          className="checkbox opacity-0 absolute cursor-pointer"
          checked={isChecked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <svg
          className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
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
);

export default Checkbox;
