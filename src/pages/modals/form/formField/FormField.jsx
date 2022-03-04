import PropTypes from 'prop-types';
import styles from './FormField.module.css';

export function FormField({ onChange, placeholder, inputValue, fieldName, readOnly, stylingType, inputName }) {
  return (
    <div className={styles.formField}>
      <div className={styles.fieldName}>{fieldName}</div>
      <input
        type={stylingType}
        disabled={readOnly}
        name={inputName}
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={({ target: { name, value } }) => onChange(name, value)}
      />
    </div>
  );
}

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  stylingType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
};
FormField.defaultProps = {
  placeholder: '',
};
