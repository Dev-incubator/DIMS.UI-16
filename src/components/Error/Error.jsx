import PropTypes from 'prop-types';
import styles from './Error.module.css';

export function Error({ message }) {
  return <div className={styles.message}>{message}</div>;
}

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: 'Oops,error',
};
