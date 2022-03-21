import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './Toast.module.css';

export function ErrorToast({ active, onClose }) {
  return (
    <Toast className={styles.error} onClose={onClose} show={active} delay={8000} autohide>
      <Toast.Body>Something went wrong, try again later!</Toast.Body>
    </Toast>
  );
}

ErrorToast.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
