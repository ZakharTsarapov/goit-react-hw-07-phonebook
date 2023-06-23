// import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
 
  
  return (
    <div>
      <h1 className={css.text}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.text}>Contacts</h2>
      <Filter />
      <ContactsList/>
    </div>
  );
};
