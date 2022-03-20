import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import noop from '../../../shared/noop';
import styles from './Button.module.css';
import { ThemeContext } from '../../../providers/ThemeProvider';

export class Button extends PureComponent {
  render() {
    const { context } = this;
    const { theme } = context;
    const { children, onClick, color, readOnly, isBackButton, ...restProps } = this.props;
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
}
Button.contextType = ThemeContext;

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
