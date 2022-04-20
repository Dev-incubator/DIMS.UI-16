import PropTypes from 'prop-types';
import styles from './DeleteModal.module.css';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';
import { Modal } from '../../../components/Modal/Modal';
import { FormSubmit } from '../form/formSubmit/FormSubmit';
import { withModalFade } from '../../../HOCs/withModalFade';

function DeleteModal({ target, active, onClose, onRemove, setFade }) {
  const removeHandler = () => {
    setFade();
    onRemove();
  };

  return (
    <Modal onClose={onClose} active={active}>
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
          onClose={onClose}
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
  onRemove: PropTypes.func.isRequired,
};

export default withModalFade(DeleteModal);
