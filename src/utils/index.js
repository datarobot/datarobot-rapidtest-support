// @ts-nocheck
import { format } from 'date-fns';
import Papa from 'papaparse';
import { SESSION_STORAGE_ITEMS, USER_ROLES } from 'rt-constants';

const isEqual = (a, b) => {
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

const download = ({ name, ext, data }) => {
  const el = document.createElement('a');
  const filenameAndDate = `${name}-${format(new Date(), 'yyyy-MM-dd')}.${ext}`;
  el.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`
  );
  el.setAttribute('download', filenameAndDate);

  el.style.display = 'none';
  document.body.appendChild(el);

  el.click();

  document.body.removeChild(el);
};

const toCsv = (data) => Papa.unparse(data);

const getUserRole = (roles) => {
  let userRole;

  if (roles && roles[USER_ROLES.dashboard]) {
    userRole = USER_ROLES.dashboard;
  } else {
    for (const role in roles) {
      if (Object.hasOwnProperty.call(roles, role)) {
        const r = roles[role];
        if (r) {
          userRole = role;
        }
      }
    }
  }

  return userRole;
};

const getIndex = (arr, accessor, matcher) =>
  arr.findIndex((a) => a[accessor] === matcher);

const emptyToNull = (obj) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const el = obj[key];
      if (el === '') {
        // eslint-disable-next-line no-param-reassign
        obj[key] = null;
      }
    }
  }

  return obj;
};

const loadGoogleScript = (callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  document.getElementsByTagName('head')[0].appendChild(script);
};

const sortArrayOfObjects = (key, order = 'asc') => {
  const innerSort = (a, b) => {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };

  return innerSort;
};

const getServerUrl = () =>
  process.env[`REACT_APP_${get('program')}_SERVER_URL`];

export {
  get,
  set,
  clearStorage,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  download,
  toCsv,
  isEqual,
  getUserRole,
  getIndex,
  emptyToNull,
  loadGoogleScript,
  sortArrayOfObjects,
  getServerUrl,
};
