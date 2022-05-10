import PropTypes from 'prop-types';
import styles from './FormSubmit.module.css';
import Button from '../../../../components/Buttons/Button/Button';
import { BUTTON_VALUES } from '../../../../constants/libraries';

export function FormSubmit({ onClose, onSubmit, submitButtonColor, readOnly, submitButtonValue, backButtonValue }) {
  return (
    <div className={styles.buttonGroup}>
      {!readOnly && (
        <Button color={submitButtonColor} onClick={onSubmit}>
          {submitButtonValue}
        </Button>
      )}
      <Button onClick={onClose} isBackButton>
        {backButtonValue}
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
  backButtonValue: PropTypes.string,
};

FormSubmit.defaultProps = {
  readOnly: false,
  submitButtonValue: BUTTON_VALUES.save,
  backButtonValue: BUTTON_VALUES.backToList,
};
