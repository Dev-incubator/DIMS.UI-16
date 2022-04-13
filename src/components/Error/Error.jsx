import PropTypes from 'prop-types';
import styles from './Error.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

export function Error({ message }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={styles.message} style={{ color: theme.error }}>
          {message}
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: 'Oops,error',
};
