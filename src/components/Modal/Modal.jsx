import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export function Modal({ active, disableModalMode, children }) {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => disableModalMode()}
      aria-hidden='true'
    >
      <div
        className={active ? `${styles.modalContent} ${styles.active}` : styles.modalContent}
        onClick={(event) => event.stopPropagation()}
        aria-hidden='true'
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  disableModalMode: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
