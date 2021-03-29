import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { getUserRefreshToken } from 'services/firebase';
import { get, getAccessToken, setAccessToken } from 'utils';

const defaultOptions = {
  baseURL: get('api'),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const autocompleteOptions = {
  baseURL: '/',
};

// Set up axios with default options and interceptors
const http = axios.create(defaultOptions);
const autocompleteHttp = axios.create(autocompleteOptions);

const interceptorSetup = (cfg) => {
  const config = cfg;
  const accessToken = getAccessToken();

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

// Set the AUTH token for any request
http.interceptors.request.use((cfg) => interceptorSetup(cfg));
http.interceptors.response.use((cfg) => interceptorSetup(cfg));

const refreshAuthLogic = (failedRequest) =>
  getUserRefreshToken().then((token) => {
    if (token) {
      setAccessToken(token);
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = `Bearer ${getAccessToken()}`;
      return Promise.resolve();
    }

    return Promise.reject(failedRequest);
  });

createAuthRefreshInterceptor(http, refreshAuthLogic, {
  statusCodes: [403],
});

// eslint-disable-next-line import/prefer-default-export
export { http, autocompleteHttp };
