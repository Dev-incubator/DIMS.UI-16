import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import styles from './Button.module.css';

export const Button = ({ children, onClick, color, readOnly, isBackButton, ...restProps }) => {
  const style = {
    backgroundColor: `var(--${color})`,
  };

  return (
    <button
      type='button'
      style={style}
      className={`${isBackButton ? styles.buttonBack : styles.button} ${readOnly && styles.disabledButton}`}
      onClick={onClick}
      disabled={readOnly}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  color: PropTypes.string,
  readOnly: PropTypes.bool,
  isBackButton: PropTypes.bool,
};
Button.defaultProps = {
  onClick: noop,
  children: null,
  color: 'secondary',
  isBackButton: false,
  readOnly: false,
};
