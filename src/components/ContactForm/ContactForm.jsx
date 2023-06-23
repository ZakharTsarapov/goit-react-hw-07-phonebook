import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getContactsItems } from 'redux/contactsSlice';

const nameId = nanoid();
const numberId = nanoid();

export const ContactForm = () => {
  const contacts = useSelector(getContactsItems);

  const dispatch = useDispatch();


  const checkName = (newName, newNumber) => {
    const chekingName = contacts.some(
      (contact) => contact.name.toLowerCase() === newName.toLowerCase()
    );

    if (chekingName) {
      Notify.failure(`${newName} is already in contacts`);
      return;
    }

    dispatch(addContact(newName, newNumber)); //відправка даних в contactsSlice для записування в стор
  };

    const handleSubmit = e => {
      e.preventDefault();
      const name = e.target.elements.name.value;
      const number = e.target.elements.number.value;
      checkName(name, number);
      e.target.reset();
    };



  return (
    <form className={css.contact__form} onSubmit={handleSubmit}>
      <label className={css.contact__label} htmlFor={nameId}>
        Name
        <input
          className={css.contact__input}
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.contact__label} htmlFor={numberId}>
        Number
        <input
          className={css.contact__input}
          id={numberId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.contact__btn} type="submit">
        Add contact
      </button>
    </form>
  );
  
}
  

