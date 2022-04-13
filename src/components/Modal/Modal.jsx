import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import styles from './Modal.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

export class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.root = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  render() {
    const { children, active, onClose } = this.props;

    return ReactDOM.createPortal(
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className={`${styles.modal} ${active && styles.active}`}
            onClick={onClose}
            aria-hidden='true'
            style={{ color: theme.textColor }}
          >
            <div
              className={`${styles.modalContent} ${active && styles.active}`}
              onClick={(event) => event.stopPropagation()}
              style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
              aria-hidden='true'
            >
              {children}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>,
      this.root,
    );
  }
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
