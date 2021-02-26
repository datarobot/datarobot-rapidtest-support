const ErrorMessage = ({ errors, errorKey }) => (
  <>
    {errors && errors[errorKey] && (
      <p className="text-dark-red font-bold text-xs uppercase">
        {errors[errorKey].message}
      </p>
    )}
  </>
);

export default ErrorMessage;
