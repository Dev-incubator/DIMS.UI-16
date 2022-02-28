import PropTypes from 'prop-types';
import styles from './FormField.module.css';

export function FormField({ onChange, placeholder, value, fieldName }) {
  return (
    <div className={styles.formField}>
      <div className={styles.fieldName}>{fieldName}</div>
      <input
        type='text'
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </div>
  );
}

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};
