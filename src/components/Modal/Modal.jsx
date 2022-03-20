import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

export function Modal({ active, disableModalMode, children }) {
  return ReactDOM.createPortal(
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          className={active ? `${styles.modal} ${styles.active}` : styles.modal}
          onClick={() => disableModalMode()}
          aria-hidden='true'
          style={{ color: theme.textColor }}
        >
          <div
            className={active ? `${styles.modalContent} ${styles.active}` : styles.modalContent}
            onClick={(event) => event.stopPropagation()}
            style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
            aria-hidden='true'
          >
            {children}
          </div>
        </div>
      )}
    </ThemeContext.Consumer>,
    document.getElementById('portal'),
  );
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  disableModalMode: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
