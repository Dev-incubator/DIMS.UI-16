import PropTypes from 'prop-types';
import { useContext } from 'react';
import noop from '../../../shared/noop';
import styles from './Button.module.css';
import { ThemeContext } from '../../../providers/ThemeProvider';

export function Button({ children, onClick, color, readOnly, isBackButton, ...restProps }) {
  const { theme } = useContext(ThemeContext);
  const style = {
    backgroundColor: theme[color],
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
}

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
