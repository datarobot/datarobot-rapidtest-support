// @ts-nocheck
import axios from 'axios';
import { http } from 'services/http';
import { emptyToNull } from 'utils';
import { captureException } from '@sentry/react';

export const addSite = async (payload) => {
  // Change empty strings to null, since the API validates against an empty string
  const newPayload = emptyToNull(payload);

  // // eslint-disable-next-line no-param-reassign
  newPayload.zip = parseInt(payload.zip, 10);
  // // eslint-disable-next-line no-param-reassign
  newPayload.site_type = 'School';

  const { data } = await http.post('/site', {
    ...newPayload,
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

export const addAccount = async (payload) => {
  const { data } = await http.post('/proctor', { ...payload });

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
  const { data } = await axios.post('/schools', { name });

  return data;
};

export const getSchool = async (id) => {
  const { data } = await axios.get(`/schools/${id}`);

  return data;
};

export const verifyCaptcha = async (token) => {
  const { data, status } = await axios.post('/captcha', { token });

  return { data, status };
};

export const getPrograms = async () => {
  try {
    const { data } = await axios.get(
      'https://rapidtest.stracdata.org/sites.json'
    );
    return data;
  } catch (err) {
    captureException(err);
    return [];
  }
};
