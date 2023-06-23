import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { deleteContact } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import { getFilterValue } from 'redux/filterSlice';
import { getContactsItems } from 'redux/contactsSlice';

export const ContactsList = () => {

  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const contacts = useSelector(getContactsItems);

  const onDeleteContact = contactID => {
    dispatch(deleteContact(contactID));
  };

const getVisibleContacts = useMemo(
  () => () => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts
      .filter(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) ||
          contact.number.includes(normalizedFilter)
      )
  },
  [contacts, filterValue]
);

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <ul className={css.item}>
        {visibleContacts.map(({ id, name, number }) => (
          <li key={id}>
            <span>
              {name} {number}
            </span>
            <button
              className={css.item__btn}
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};