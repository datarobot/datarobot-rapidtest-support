import { VALID_SITE_COLUMNS, VALID_ACCOUNT_COLUMNS } from 'rt-constants';

const difference = (a, b) => a.filter((x) => !b.includes(x));

export const isValidSitesList = (list) => {
  const { REQUIRED } = VALID_SITE_COLUMNS;
  return REQUIRED.every((a) => list.includes(a));
};

export const getSiteError = (list) => {
  const { REQUIRED, OPTIONAL } = VALID_SITE_COLUMNS;
  const diff = difference(list, [...REQUIRED, ...OPTIONAL]);

  if (diff.length > 0) {
    return { type: 'invalid', cols: diff };
  }

  return { type: 'required', cols: difference([...REQUIRED], list) };
};

export const isValidAccountList = (list) => {
  const { REQUIRED } = VALID_ACCOUNT_COLUMNS;

  return REQUIRED.every((a) => list.includes(a));
};

export const getAccountError = (list) => {
  const { REQUIRED, OPTIONAL } = VALID_ACCOUNT_COLUMNS;
  const diff = difference(list, [...REQUIRED, ...OPTIONAL]);

  if (diff.length > 0) {
    return { type: 'invalid', cols: diff };
  }

  return { type: 'required', cols: difference([...REQUIRED], list) };
};
