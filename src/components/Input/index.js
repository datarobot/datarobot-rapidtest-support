// @ts-nocheck
import { forwardRef, useState } from 'react';
import cls from 'classnames';
import InputMask from 'react-input-mask';

import Button, { KIND } from 'components/Button';
import Icon from 'components/Icon';

import './Input.css';

const Input = ({
  v2 = false,
  name,
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
  mask,
  className,
  labelClass,
  rounded,
  isRequired,
  optional,
  errorMessage,
  isSearch,
  wrapperClass,
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
      {(label || optional) && (
        <label
          className={cls('input-label', labelClass, {
            required: isRequired,
            v2,
          })}
          htmlFor={name}
        >
          {label}
          {label && ' '}
          {optional && <span className="optional">Optional</span>}
        </label>
      )}
      {icon && (
        <span className="placeholder-icon">
          <Icon iconName={icon} type="fal" />
        </span>
      )}
      <span
        className={cls(wrapperClass, {
          'w-full': !isSearch,
          relative: type === 'password',
        })}
      >
        {mask ? (
          <InputMask
            mask={mask}
            name={name}
            id={name}
            className={cls(className, 'input', {
              isRounded: rounded,
              v2,
              isSearch,
              error: errorMessage,
              'pl-9': icon,
            })}
            type={getInputType()}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        ) : (
          <input
            name={name}
            id={name}
            className={cls(className, 'input', {
              isRounded: rounded,
              v2,
              isSearch,
              error: errorMessage,
              'pl-9': icon,
            })}
            type={getInputType()}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
        )}
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
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {errorMessage && <br />}
    </>
  );
};

export const ControlledInput = forwardRef(
  (
    {
      v2 = false,
      name,
      label,
      type,
      value,
      placeholder,
      className,
      labelClass,
      rounded,
      isRequired,
      optional,
      errorMessage,
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
        {(label || optional) && (
          <label
            className={cls('input-label', labelClass, {
              required: isRequired,
              v2,
            })}
            htmlFor={name}
          >
            {label}
            {optional && <span className="optional">Optional</span>}
          </label>
        )}
        <span className={cls('w-full', { relative: type === 'password' })}>
          <input
            ref={ref}
            name={name}
            id={name}
            className={cls(className, 'input', {
              isRounded: rounded,
              v2,
              error: errorMessage,
            })}
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
              className={cls('show-password-toggle', { v2 })}
              label={
                <Icon
                  type={v2 ? 'fas' : 'fal'}
                  size={v2 ? 'sm' : null}
                  iconName={showPasswordText ? 'eye-slash' : 'eye'}
                />
              }
            />
          )}
        </span>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
        {errorMessage && <br />}
      </>
    );
  }
);

export default Input;
