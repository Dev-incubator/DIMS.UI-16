import PropTypes from 'prop-types';
import styles from './DeleteModal.module.css';
import modalStyles from '../Modals.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../scripts/libraries';

export function DeleteModal({ target, removeHandler, cancelHandler }) {
  return (
    <div className={modalStyles.popup}>
      <div className={`${modalStyles.popupContent} ${styles.content}`}>
        <div className={styles.title}>Delete {target}</div>
        <div className={styles.text}>
          Are you sure you want <br />
          to delete the current <br />
          {target} ?
        </div>
        <div className={styles.buttonGroup}>
          <Button color={BUTTON_COLORS.red} onClick={removeHandler}>
            {BUTTON_VALUES.delete}
          </Button>
          <Button onClick={cancelHandler} isBackButton>
            {BUTTON_VALUES.backToList}
          </Button>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  target: PropTypes.string.isRequired,
  removeHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};
