// @ts-nocheck
import React, { useState, useEffect } from 'react';
import cls from 'classnames';

import './ToggleButton.css';

const ToggleButton = ({
  v2 = false,
  defaultChecked = false,
  onChange = () => {},
  disabled = false,
  title,
  className,
}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(defaultChecked);
  }, [defaultChecked]);

  // const triggerToggle = () => {
  //   if (disabled) {
  //     return;
  //   }

  //   if (typeof onChange === 'function') {
  //     onChange(!toggle);
  //     setToggle(!toggle);
  //   }
  // };

  const toggleClasses = cls(
    'toggle',
    {
      v2,
      'toggle--checked': toggle,
      'toggle--disabled': disabled,
    },
    className
  );

  return (
    <div onClick={onChange} className={toggleClasses} title={title}>
      <div className={cls('toggle-container', { v2, checked: toggle })}>
        <div className="toggle-check" />
        <div className="toggle-uncheck" />
      </div>
      <div className="toggle-circle" />
      <input
        type="checkbox"
        aria-label="Toggle Button"
        className="toggle-input"
        defaultChecked={defaultChecked || false}
        onChange={onChange}
      />
    </div>
  );
};

export default ToggleButton;
