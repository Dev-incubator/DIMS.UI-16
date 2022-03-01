import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import styles from './FormField.module.css';

export const INPUT_TYPES = {
  text: 'text',
  date: 'date',
};

export class FormField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: INPUT_TYPES.text,
      style: null,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if (type === INPUT_TYPES.date) {
      this.setState({ style: INPUT_TYPES.date });
    }
  }

  setType = (value) => {
    const { type } = this.props;
    if (type === INPUT_TYPES.date) {
      this.setState({ type: value });
    }
  };

  render() {
    const { onChange, placeholder, value, fieldName, readOnly, required } = this.props;
    const { type, style } = this.state;

    return (
      <div className={styles.formField}>
        <div className={styles.fieldName}>{fieldName}</div>
        <input
          type={type}
          required={required}
          disabled={readOnly}
          className={`${styles.input} ${styles[style]}`}
          placeholder={placeholder}
          onFocus={() => this.setType(INPUT_TYPES.date)}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      </div>
    );
  }
}

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
FormField.defaultProps = {
  required: false,
};
