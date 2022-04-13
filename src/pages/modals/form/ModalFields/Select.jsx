import PropTypes from 'prop-types';
import styles from './ModalFields.module.css';
import noop from '../../../../shared/noop';
import { Error } from '../../../../components/Error/Error';

export function Select({ defaultValue, onChange, value, title, readOnly, fieldName, error, items }) {
  const onChangeHandler = ({ target }) => {
    onChange(target.name, target.value);
  };

  return (
    <div className={styles.formField}>
      <div className={styles.title}>{title}</div>
      <div>
        <select
          value={value}
          className={`${styles.input} ${!value ? styles.placeholder : ''}`}
          disabled={readOnly}
          name={fieldName}
          onChange={onChangeHandler}
        >
          <option value='' disabled hidden>
            {defaultValue}
          </option>
          {items.map((item, index) => (
            <option key={item + index.toString()} value={item}>
              {item}
            </option>
          ))}
        </select>
        {error && <Error message={error} />}
      </div>
    </div>
  );
}

Select.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  fieldName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
Select.defaultProps = {
  error: '',
  fieldName: '',
  readOnly: false,
  onChange: noop,
};
