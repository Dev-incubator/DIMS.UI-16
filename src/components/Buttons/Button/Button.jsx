import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import styles from './Button.module.css';
import { withThemeContext } from '../../../HOCs/withThemeContext';

function Button({ children, context, onClick, color, readOnly, isBackButton, ...restProps }) {
  const { theme } = context;

  return (
    <button
      type='button'
      className={`${isBackButton ? styles.buttonBack : styles.button}
       ${readOnly && styles.disabledButton} 
      ${styles[color]} ${styles[theme]}`}
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
    theme: PropTypes.string,
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
