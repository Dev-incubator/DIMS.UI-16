import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import styles from './Alert.module.css';

export function CustomAlert({ isActive, variant, text }) {
  return (
    <Alert className={isActive ? `${styles.alert} ${styles.active}` : styles.alert} show variant={variant}>
      <div>{text}</div>
    </Alert>
  );
}

CustomAlert.propTypes = {
  isActive: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
