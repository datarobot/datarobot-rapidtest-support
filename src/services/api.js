import axios from 'axios';

// const serverUrl = 'https://app.warapidtest.org/api/maintenance/v1';
const serverUrl = '/api/maintenance/v1';

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

export const requestAccess = async ({ firstName, lastName, email, phone }) => {
  const { data } = await http.post(`${serverUrl}/proctors`, {
    firstName,
    lastName,
    email,
    phone,
    requestPending: true,
    enabled: false,
    dateAdded: new Date(),
  });

  return data;
};

export const addSite = async (payload) => {
  const { street, city, state, zip } = payload;

  const { data } = await http.post('/api/sites', {
    ...payload,
    address: { street, city, state, zip },
  });

  return data;
};

export const editSite = async (id, payload) => {
  const { data } = await http.put(`${serverUrl}/sites/${id}`, {
    ...payload,
  });

  return data;
};

export const getSiteList = async () => {
  const { data } = await http.get('/sites');

  return data;
};

export const getSite = async (id) => {
  const { data } = await http.get(`${serverUrl}/sites/${id}`);

  return data;
};

export const editAccount = async (id, payload) => {
  const { data } = await http.put(`${serverUrl}/proctor/${id}`, {
    ...payload,
  });

  return data;
};

export const getAccount = async (id) => {
  const { data } = await http.get(`${serverUrl}/proctor/${id}`);

  return data;
};

export const getAccountList = async () => {
  const { data } = await http.get('/proctors');

  return data;
};

export const searchSchool = async (name) => {
  const { data } = await http.post(`${serverUrl}/schools`, { name });

  return data;
};

export const getSchool = async (id) => {
  const { data } = await http.get(`${serverUrl}/schools/${id}`);

  return data;
};
