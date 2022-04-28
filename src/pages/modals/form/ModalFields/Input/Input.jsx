import PropTypes from 'prop-types';
import styles from './Input.module.css';
import fieldStyles from '../ModalFields.module.css';
import noop from '../../../../../shared/noop';
import { INPUT_TYPES } from '../../../../../constants/libraries';
import { Error } from '../../../../../components/Error/Error';
import { ThemeContext } from '../../../../../providers/ThemeProvider';

export function Input({ onChange, value, placeholder, readOnly, fieldName, error, type, title, autoComplete }) {
  const onChangeHandler = ({ target: { name, value: inputValue } }) => {
    onChange(name, inputValue);
  };

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={fieldStyles.formField}>
          <div className={fieldStyles.title}>{title}</div>
          <div>
            <input
              type={type}
              disabled={readOnly}
              name={fieldName}
              className={`${styles.input} ${styles[theme]}`}
              placeholder={placeholder}
              value={value}
              autoComplete={autoComplete}
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
  autoComplete: PropTypes.oneOf(['on', 'off']),
};

Input.defaultProps = {
  error: '',
  fieldName: '',
  readOnly: false,
  placeholder: '',
  onChange: noop,
  autoComplete: 'on',
  type: INPUT_TYPES.text,
};
