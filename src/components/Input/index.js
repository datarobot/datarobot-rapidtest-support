// @ts-nocheck
import { forwardRef, useState } from 'react';
import cls from 'classnames';

import Button, { KIND } from 'components/Button';
import Icon from 'components/Icon';

import './Input.css';

const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  labelClass,
  rounded,
  isRequired,
  ...rest
}) => {
  const [showPasswordText, setShowPasswordText] = useState(false);

  const getInputType = () => {
    if (type === 'password' && showPasswordText) {
      return 'text';
    }

    return type;
  };

  return (
    <>
      {label && (
        <label
          className={cls('input-label', labelClass, { required: isRequired })}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <span className={cls('w-full', { relative: type === 'password' })}>
        <input
          name={name}
          id={name}
          className={cls(className, 'input', { isRounded: rounded })}
          type={getInputType()}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
        {type === 'password' && (
          <Button
            kind={KIND.DEFAULT}
            onClick={() => setShowPasswordText(!showPasswordText)}
            tabIndex={-1}
            className="show-password-toggle"
            label={
              <Icon
                type="fal"
                iconName={showPasswordText ? 'eye-slash' : 'eye'}
              />
            }
          />
        )}
      </span>
    </>
  );
};

export const ControlledInput = forwardRef(
  (
    {
      name,
      label,
      type,
      value,
      placeholder,
      className,
      labelClass,
      rounded,
      isRequired,
      ...rest
    },
    ref
  ) => {
    const [showPasswordText, setShowPasswordText] = useState(false);

    const getInputType = () => {
      if (type === 'password' && showPasswordText) {
        return 'text';
      }

      return type;
    };

    return (
      <>
        {label && (
          <label
            className={cls('input-label', labelClass, { required: isRequired })}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <span className={cls('w-full', { relative: type === 'password' })}>
          <input
            ref={ref}
            name={name}
            id={name}
            className={cls(className, 'input', { isRounded: rounded })}
            type={getInputType()}
            value={value}
            placeholder={placeholder}
            {...rest}
          />

          {type === 'password' && (
            <Button
              kind={KIND.DEFAULT}
              onClick={() => setShowPasswordText(!showPasswordText)}
              tabIndex={-1}
              className="show-password-toggle"
              label={
                <Icon
                  type="fal"
                  iconName={showPasswordText ? 'eye-slash' : 'eye'}
                />
              }
            />
          )}
        </span>
      </>
    );
  }
);

export default Input;
