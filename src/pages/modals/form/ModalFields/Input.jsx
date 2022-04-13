import PropTypes from 'prop-types';
import styles from './ModalFields.module.css';
import noop from '../../../../shared/noop';
import { INPUT_TYPES } from '../../../../constants/libraries';
import { Error } from '../../../../components/Error/Error';
import { ThemeContext } from '../../../../providers/ThemeProvider';

export function Input({ onChange, value, placeholder, readOnly, fieldName, error, type, title }) {
  const onChangeHandler = ({ target }) => {
    onChange(target.name, target.value);
  };

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={styles.formField}>
          <div className={styles.title}>{title}</div>
          <div>
            <input
              type={type}
              disabled={readOnly}
              name={fieldName}
              className={styles.input}
              style={{ borderColor: theme.borderColor, color: theme.textColor }}
              placeholder={placeholder}
              value={value}
              onChange={onChangeHandler}
            />
            {error && <Error message={error} />}
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};
Input.defaultProps = {
  error: '',
  fieldName: '',
  readOnly: false,
  placeholder: '',
  onChange: noop,
  type: INPUT_TYPES.text,
};
