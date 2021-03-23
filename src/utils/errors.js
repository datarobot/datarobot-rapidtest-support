// eslint-disable-next-line import/prefer-default-export
export const parseError = (err) => {
  const regex = /.*\((.*)\)\./gi;
  if (err.originalError?.info?.message) {
    if (err.originalError.info.message.includes('The duplicate key value is')) {
      return `Duplicate record: ${
        regex.exec(err.originalError.info.message)[1]
      }`;
    }
  }

  if (err.county_id) {
    return err.county_id;
  }
};
