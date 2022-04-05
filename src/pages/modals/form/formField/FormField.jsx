import PropTypes from 'prop-types';
import styles from './FormField.module.css';
import noop from '../../../../shared/noop';
import { INPUT_TYPES } from '../../../../constants/libraries';

export function FormField({ onChange, inputValue, fieldName, readOnly, stylingType, inputName, error, selectValues }) {
  const changeInputHandler = ({ target: { name, value } }) => {
    onChange(name, value);
  };

  return (
    <div className={styles.formField}>
      <div className={styles.fieldName}>{fieldName}</div>
      <div>
        {selectValues ? (
          <select
            value={inputValue}
            className={inputValue ? styles.input : `${styles.input} ${styles.placeholder}`}
            disabled={readOnly}
            name={inputName}
            onChange={changeInputHandler}
          >
            <option value='' disabled hidden>
              {fieldName}
            </option>
            {selectValues.map((item, index) => (
              <option key={item + index.toString()} value={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={stylingType}
            disabled={readOnly}
            name={inputName}
            className={styles.input}
            placeholder={fieldName}
            value={inputValue}
            onChange={changeInputHandler}
          />
        )}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}

FormField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func,
  inputValue: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  stylingType: PropTypes.string,
  inputName: PropTypes.string,
  selectValues: PropTypes.arrayOf(PropTypes.string),
};
FormField.defaultProps = {
  error: '',
  inputName: '',
  readOnly: false,
  onChange: noop,
  selectValues: null,
  stylingType: INPUT_TYPES.text,
};
