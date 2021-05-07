import cls from 'classnames';

const ErrorMessage = ({ v2, errors, errorKey }) => (
  <>
    {errors && errors[errorKey] && (
      <p
        className={cls({
          'text-dark-red': !v2,
          'font-bold': !v2,
          'text-xs': !v2,
          uppercase: !v2,
          'error-message': v2,
        })}
      >
        {errors[errorKey].message}
      </p>
    )}
  </>
);

export default ErrorMessage;
