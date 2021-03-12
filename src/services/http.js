/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { getUserRefreshToken } from 'services/firebase';
import { getAccessToken, setAccessToken, clearStorage } from 'utils';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_SERVER_URL
    : '/api/maintenance/v1';

const defaultOptions = {
  baseURL: serverUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// Set up axios with default options and interceptors
const http = axios.create(defaultOptions);

const interceptorSetup = (cfg) => {
  const config = cfg;
  const accessToken = getAccessToken();

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const refreshTokenHelper = async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;

    const token = await getUserRefreshToken();
    if (token) {
      setAccessToken(token);
      axios.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;

      return axios(originalRequest);
    }
  }
  return Promise.reject(error);
};

// Set the AUTH token for any request
http.interceptors.request.use((cfg) => interceptorSetup(cfg));
http.interceptors.response.use(
  (cfg) => interceptorSetup(cfg),
  (err) => refreshTokenHelper(err)
);

const fetchAuth = async (url, method, data, options) => {
  const httpMethodMap = {
    GET: http.get,
    PATCH: http.patch,
    POST: http.post,
    PUT: http.put,
    DELETE: http.delete,
  };
  const fetch = httpMethodMap[method];

  if (!fetch) {
    throw new Error('Unknown HTTP method in auth fetch!');
  }

  let result;
  try {
    result = await fetch(url, data, options);
  } catch (err) {
    const response = err.response || {};
    if (response.status === 403) {
      try {
        const tokenHelper = await refreshTokenHelper(err);
        return tokenHelper;
      } catch (refreshErr) {
        clearStorage();

        window.history.pushState({}, '', '/login');
        throw refreshErr;
      }
      result = fetch(url, data);
    } else {
      throw err;
    }
  }

  return result;
};

const authHttp = {
  get: (url, options) => fetchAuth(url, 'GET', null, options),
  delete: (url, options) => fetchAuth(url, 'DELETE', null, options),
  post: (url, data, options) => fetchAuth(url, 'POST', data, options),
  put: (url, data, options) => fetchAuth(url, 'PUT', data, options),
  patch: (url, data, options) => fetchAuth(url, 'PATCH', data, options),
};

export { http, authHttp };
