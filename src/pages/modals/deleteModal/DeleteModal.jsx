import PropTypes from 'prop-types';
import styles from './DeleteModal.module.css';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';
import { Modal } from '../../../components/Modal/Modal';
import { FormSubmit } from '../form/formSubmit/FormSubmit';
import { withModalFade } from '../../../HOCs/withModalFade';

function DeleteModal({ target, active, onClose, removeHandler, setFade }) {
  const onRemove = () => {
    setFade();
    removeHandler();
  };

  return (
    <Modal disableModalMode={onClose} active={active}>
      <div>
        <div className={styles.title}>Delete {target}</div>
        <div className={styles.text}>
          Are you sure you want <br />
          to delete the current <br />
          {target} ?
        </div>
        <FormSubmit
          submitButtonColor={BUTTON_COLORS.red}
          onSubmit={onRemove}
          disableModalMode={onClose}
          submitButtonValue={BUTTON_VALUES.delete}
        />
      </div>
    </Modal>
  );
}

DeleteModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFade: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  removeHandler: PropTypes.func.isRequired,
};

export default withModalFade(DeleteModal);
