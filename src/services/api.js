import axios from 'axios';

export const requestAccess = async ({ firstName, lastName, email, phone }) => {
  const { data } = await axios.post('/accounts', {
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

export const getSiteList = async () => {
  const { data } = await axios.get('/sites');

  return data;
};

export const getAccountList = async () => {
  const { data } = await axios.get('/accounts');

  return data;
};
