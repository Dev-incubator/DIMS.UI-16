import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import styles from './Modal.module.css';

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
    const { active, disableModalMode, children } = this.props;

    return ReactDOM.createPortal(
      <div className={`${styles.modal} ${active ? styles.active : ''}`} onClick={disableModalMode} aria-hidden='true'>
        <div
          className={`${styles.modalContent} ${active ? styles.active : ''}`}
          onClick={(event) => event.stopPropagation()}
          aria-hidden='true'
        >
          {children}
        </div>
      </div>,
      this.root,
    );
  }
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  disableModalMode: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
