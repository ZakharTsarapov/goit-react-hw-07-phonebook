import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch()

  const onChange = (event) => {
    dispatch(setFilter(event.target.value));
  }
 
  
    return (
      <label className={css.filter}>
        Find contacts by name
        <input
          className={css.filter__input}
          type="text"
          onChange={onChange}
          required
        ></input>
      </label>
    );
}
 

