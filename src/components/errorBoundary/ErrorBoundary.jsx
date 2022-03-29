import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className={styles.error}>
          <h1>Something went wrong</h1>
          <div>Try to update page</div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
