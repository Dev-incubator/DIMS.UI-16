import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './Toast.module.css';

export function ErrorToast({ active, onClose, message, delay }) {
  return (
    <Toast className={styles.error} bg='warning' onClose={onClose} show={active} delay={delay} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

ErrorToast.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  delay: PropTypes.number,
};

ErrorToast.defaultProps = {
  message: 'Something went wrong, try again later!',
  delay: 5000,
};
