import PropTypes from 'prop-types';
import styles from './FormSubmit.module.css';
import Button from '../../../../components/Buttons/Button/Button';
import { BUTTON_VALUES } from '../../../../constants/libraries';

export function FormSubmit({ onClose, onSubmit, submitButtonColor, readOnly, submitButtonValue }) {
  return (
    <div className={styles.buttonGroup}>
      {!readOnly && (
        <Button color={submitButtonColor} onClick={onSubmit}>
          {submitButtonValue}
        </Button>
      )}
      <Button onClick={onClose} isBackButton>
        {BUTTON_VALUES.backToList}
      </Button>
    </div>
  );
}

FormSubmit.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonColor: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  submitButtonValue: PropTypes.string,
};

FormSubmit.defaultProps = {
  readOnly: false,
  submitButtonValue: BUTTON_VALUES.save,
};
