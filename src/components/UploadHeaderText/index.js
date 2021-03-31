import { Fragment } from 'react';
import Icon from 'components/Icon';

const UploadHeaderText = ({ clearErrors, errors, pageType, validColumns }) => {
  const { REQUIRED, OPTIONAL } = validColumns;

  if (errors.length > 0) {
    return (
      <section className="py-2 w-full">
        {errors.map((err, i) => (
          <p
            className="text-dark-red font-medium mb-1 flex justify-between"
            key={i}
          >
            <span>
              <Icon className="mr-1" iconName="exclamation-circle" />
              {err}
            </span>
            <button
              type="button"
              onClick={clearErrors}
              className="cursor-pointer text-black"
            >
              <Icon iconName="times" type="fal" />
            </button>
          </p>
        ))}
      </section>
    );
  }

  return (
    <>
      <p>Upload a CSV file with a list of {pageType} to add to your program.</p>
      <div className="mt-2">
        Valid column names are:
        <aside className="font-mono text-xs column-list">
          {REQUIRED.map((reqCol, i) => (
            <span key={i}>
              {reqCol}
              <sup>*</sup>,{' '}
            </span>
          ))}
          {OPTIONAL.map((optCol, i) => (
            <Fragment key={i}>
              {i !== OPTIONAL.length - 1 ? (
                <span>{optCol}, </span>
              ) : (
                <span>{optCol}</span>
              )}
            </Fragment>
          ))}
        </aside>
      </div>
    </>
  );
};

export default UploadHeaderText;
