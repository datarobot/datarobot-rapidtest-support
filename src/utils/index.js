import { SESSION_STORAGE_ITEMS } from 'rt-constants';

export const isEqual = (a, b) => {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
};

// We are using localStorage instead of sessionStorage to do not force the user to sign in each time (bad UX)
const ls = window.localStorage;

const get = (key) => {
  const store = JSON.parse(ls.getItem(SESSION_STORAGE_ITEMS.MAIN));
  const isStoreExist = !!store;

  return isStoreExist ? store[key] : null;
};

const set = (key, val) => {
  const store = JSON.parse(ls.getItem(SESSION_STORAGE_ITEMS.MAIN));
  const isStoreExist = !!store;
  if (isStoreExist) {
    store[key] = val;
    ls.setItem(SESSION_STORAGE_ITEMS.MAIN, JSON.stringify(store));
  } else {
    ls.setItem(SESSION_STORAGE_ITEMS.MAIN, JSON.stringify({ [key]: val }));
  }
};

const clearStorage = () => {
  ls.removeItem(SESSION_STORAGE_ITEMS.MAIN);
  ls.removeItem(SESSION_STORAGE_ITEMS.REFRESH_TOKEN);
  ls.removeItem(SESSION_STORAGE_ITEMS.ACCESS_TOKEN);
};

const getAccessToken = () =>
  ls.getItem(SESSION_STORAGE_ITEMS.ACCESS_TOKEN) || null;

const setAccessToken = (accessToken) => {
  ls.setItem(SESSION_STORAGE_ITEMS.ACCESS_TOKEN, accessToken);
};

const getRefreshToken = () =>
  ls.getItem(SESSION_STORAGE_ITEMS.REFRESH_TOKEN) || null;

const setRefreshToken = (refreshToken) => {
  ls.setItem(SESSION_STORAGE_ITEMS.REFRESH_TOKEN, refreshToken);
};

export {
  get,
  set,
  clearStorage,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
};
