import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import styles from './BackButton.module.css';

export function BackButton({ children, onClick, ...restProps }) {
  return (
    <button type='button' className={styles.buttonBack} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
BackButton.defaultProps = {
  onClick: noop,
  children: null,
};
