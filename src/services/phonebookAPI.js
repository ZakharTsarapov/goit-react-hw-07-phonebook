import axios from 'axios';

axios.defaults.baseURL = 'https://649ade98bf7c145d0239a19c.mockapi.io/';

export const getContacts = async () => {
  const { data } = await axios.get('/contacts'); 
  return data;
};

export const postContact = async newContact => {
  const { data } = await axios.post('/contacts', newContact);
  return data;
};

export const deleteContact = async contactId => {
  const { data } = await axios.delete(`/contacts/${contactId}`);
  return data;
};
