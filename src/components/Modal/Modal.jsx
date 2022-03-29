import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export function Modal({ active, disableModalMode, children }) {
  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${active ? styles.active : ''}`} onClick={disableModalMode} aria-hidden='true'>
      <div
        className={`${styles.modalContent} ${active ? styles.active : ''}`}
        onClick={(event) => event.stopPropagation()}
        aria-hidden='true'
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal'),
  );
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  disableModalMode: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
