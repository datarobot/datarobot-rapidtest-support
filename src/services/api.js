import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
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
