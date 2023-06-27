import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getContactsItems } from 'redux/contactsSlice';

const nameId = nanoid();
const numberId = nanoid();

export const ContactForm = () => {
  const { items: contacts=[] } = useSelector(getContactsItems);

  const dispatch = useDispatch();


  const checkName = (name, number) => {
    const chekingName = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (chekingName) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    const newContact = { name, number }

    dispatch(addContact(newContact));
  };

    const handleSubmit = e => {
      e.preventDefault();
      const name = e.target.elements.name.value.trim();
      const number = e.target.elements.number.value.trim();
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
  

