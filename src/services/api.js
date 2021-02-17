import axios from 'axios';

export const requestAccess = async ({ firstName, lastName, email, phone }) => {
  const { data } = await axios.post('/api/accounts', {
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

  const { data } = await axios.post('/api/sites', {
    ...payload,
    address: { street, city, state, zip },
  });

  return data;
};

export const editSite = async (id, payload) => {
  const { data } = await axios.put(`/api/sites/${id}`, {
    ...payload,
  });

  return data;
};

export const getSiteList = async () => {
  const { data } = await axios.get('/api/sites');

  return data;
};

export const getSite = async (id) => {
  const { data } = await axios.get(`/api/sites/${id}`);

  return data;
};

export const editAccount = async (id, payload) => {
  const { data } = await axios.put(`/api/accounts/${id}`, {
    ...payload,
  });

  return data;
};

export const getAccount = async (id) => {
  const { data } = await axios.get(`/api/accounts/${id}`);

  return data;
};

export const getAccountList = async () => {
  const { data } = await axios.get('/api/accounts');

  return data;
};

export const searchSchool = async (name) => {
  const { data } = await axios.post('/schools', { name });

  return data;
};

export const getSchool = async (id) => {
  const { data } = await axios.get(`/schools/${id}`);

  return data;
};
