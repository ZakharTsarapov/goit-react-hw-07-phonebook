import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, postContact, deleteContact } from '../services/phonebookAPI';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContacts();

      const sortedByName = data.sort((a, b) => a.name.localeCompare(b.name));
      return sortedByName;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const data = await postContact(newContact);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const removeContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const data = await deleteContact(contactId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
