import axios from 'axios';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_SERVER_URL
    : '/api/maintenance/v1';

// const autocompleteUrl =
//   process.env.NODE_ENV === 'production' ? 'http://localhost:1337/api' : '';

const defaultOptions = {
  baseURL: serverUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'CF-Access-Client-Id': process.env.REACT_APP_API_CLIENT,
    'CF-Access-Client-Secret': process.env.REACT_APP_API_SECRET,
  },
};

// Set up axios with default options and interceptors
const http = axios.create(defaultOptions);

export const requestAccess = async ({
  first_name,
  last_name,
  email_address,
  phone_office,
}) => {
  const { data } = await http.post('/proctor', {
    first_name,
    last_name,
    email_address,
    phone_office,
  });

  return data;
};

export const addSite = async (payload) => {
  const zip = parseInt(payload.zip, 10);
  // eslint-disable-next-line no-param-reassign
  payload.zip = zip;
  // eslint-disable-next-line no-param-reassign
  payload.site_type = 'School';

  const { data } = await http.post('/site', {
    ...payload,
  });

  return data;
};

export const editSite = async (id, payload) => {
  const { data } = await http.patch(`/site/${id}`, {
    ...payload,
  });

  return data;
};

export const getSiteList = async () => {
  const { data } = await http.get('/sites');

  return data;
};

export const getSite = async (id) => {
  const { data } = await http.get(`/site/${id}`);

  return data;
};

export const editAccount = async (id, payload) => {
  const { data } = await http.patch(`/proctor/${id}`, {
    ...payload,
  });

  return data;
};

export const getAccount = async (id) => {
  const { data } = await http.get(`/proctor/${id}`);

  return data[0];
};

export const getAccountList = async () => {
  const { data } = await http.get('/proctors');

  return data;
};

export const searchSchool = async (name) => {
  const { data } = await axios.post('/api/schools', { name });

  return data;
};

export const getSchool = async (id) => {
  const { data } = await axios.get(`/api/schools/${id}`);

  return data;
};
