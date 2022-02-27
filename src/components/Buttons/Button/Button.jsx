import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import styles from './Button.module.css';

export const Button = ({ children, onClick, color, ...restProps }) => {
  const style = {
    backgroundColor: `var(--${color})`,
  };

  return (
    <button type='button' style={style} className={styles.button} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  color: PropTypes.string,
};
Button.defaultProps = {
  onClick: noop,
  children: null,
  color: 'secondary',
};
