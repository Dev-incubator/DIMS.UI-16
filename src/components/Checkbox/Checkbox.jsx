import PropTypes from 'prop-types';
import styles from './Checkbox.module.css';

export function Checkbox({ id, value, text, onChange }) {
  return (
    <div>
      <input type='checkbox' autoComplete='off' id={id} checked={value} onChange={onChange} />
      <label className={styles.label} htmlFor={id}>
        {text}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
