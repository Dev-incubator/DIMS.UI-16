import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import styles from './Button.module.css';
import { withThemeContext } from '../../../HOCs/withThemeContext';

function Button({ children, context, onClick, color, readOnly, isBackButton, ...restProps }) {
  const { theme } = context;
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
  context: PropTypes.shape({
    theme: PropTypes.shape({}),
  }).isRequired,
  isBackButton: PropTypes.bool,
};
Button.defaultProps = {
  onClick: noop,
  children: null,
  color: 'secondary',
  isBackButton: false,
  readOnly: false,
};

export default withThemeContext(Button);
