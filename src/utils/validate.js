import { VALID_SITE_COLUMNS, VALID_ACCOUNT_COLUMNS } from 'rt-constants';

const isEqual = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const difference = (a, b) => a.filter((x) => !b.includes(x));

export const isValidSitesList = (list) => {
  const { REQUIRED, OPTIONAL } = VALID_SITE_COLUMNS;
  return isEqual(list, [...REQUIRED, ...OPTIONAL]);
};

export const getSiteError = (list) => difference(list, VALID_SITE_COLUMNS);

export const isValidAccountsList = (list) => {
  const { REQUIRED, OPTIONAL } = VALID_ACCOUNT_COLUMNS;
  return isEqual(list, [...REQUIRED, ...OPTIONAL]);
};
