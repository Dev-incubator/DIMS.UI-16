import PropTypes from 'prop-types';
import styles from './FormField.module.css';
import noop from '../../../../shared/noop';

export function FormField({ onChange, placeholder, inputValue, fieldName, readOnly, stylingType, inputName, error }) {
  return (
    <div className={styles.formField}>
      <div className={styles.fieldName}>{fieldName}</div>
      <div>
        <input
          type={stylingType}
          disabled={readOnly}
          name={inputName}
          className={styles.input}
          placeholder={placeholder}
          value={inputValue}
          onChange={({ target: { name, value } }) => onChange(name, value)}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}

FormField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func,
  inputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  stylingType: PropTypes.string.isRequired,
  inputName: PropTypes.string,
};
FormField.defaultProps = {
  error: '',
  inputName: '',
  placeholder: '',
  readOnly: false,
  onChange: noop,
};
