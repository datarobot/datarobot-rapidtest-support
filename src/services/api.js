import axios from 'axios';
import { http, autocompleteHttp } from 'services/http';

const isProd = process.env.NODE_ENV === 'production';

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

export const addAccount = async ({
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
  const { data } = isProd
    ? await autocompleteHttp.post('/schools', { name })
    : await axios.post('/schools', { name });

  return data;
};

export const getSchool = async (id) => {
  const { data } = isProd
    ? await autocompleteHttp.get(`/schools/${id}`)
    : await axios.get(`/schools/${id}`);

  return data;
};
