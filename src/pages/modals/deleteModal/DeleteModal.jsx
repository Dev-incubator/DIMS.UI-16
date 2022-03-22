import PropTypes from 'prop-types';
import styles from './DeleteModal.module.css';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';
import { Modal } from '../../../components/Modal/Modal';
import { FormSubmit } from '../form/formSubmit/FormSubmit';

export function DeleteModal({ target, removeHandler, cancelHandler, active }) {
  return (
    <Modal disableModalMode={cancelHandler} active={active}>
      <div>
        <div className={styles.title}>Delete {target}</div>
        <div className={styles.text}>
          Are you sure you want <br />
          to delete the current <br />
          {target} ?
        </div>
        <FormSubmit
          submitButtonColor={BUTTON_COLORS.red}
          onSubmit={removeHandler}
          disableModalMode={cancelHandler}
          submitButtonValue={BUTTON_VALUES.delete}
        />
      </div>
    </Modal>
  );
}

DeleteModal.propTypes = {
  active: PropTypes.bool.isRequired,
  target: PropTypes.string.isRequired,
  removeHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};
