import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
import { fetchContacts, addContact, removeContact } from './operations';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilledGot = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
};

const handleFulfilledPost = (state, { payload }) => {
  state.isLoading = false;
  state.items.push(payload);
};

const handleFulfilledDeleted = (state, { payload }) => {
  state.isLoading = false;
  const index = state.items.findIndex(contact => contact.id === payload.id);
  state.items.splice(index, 1);
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGot)
      .addCase(addContact.fulfilled, handleFulfilledPost)
      .addCase(removeContact.fulfilled, handleFulfilledDeleted)
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;

// const persistConfig = {
//   key: 'contacts',
//   storage,
// };

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const getContactsItems = state => state.contacts;
