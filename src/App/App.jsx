import { PureComponent } from 'react';
import { Switch } from 'react-router-dom';
import { appTitle } from '../config';
import './App.css';
import styles from './App.module.css';
import Header from './header/Header';
import { COPYRIGHT } from '../constants/libraries';
import { ErrorBoundary } from '../components/errorBoundary/ErrorBoundary';
import { GeneratedRoutes } from './GeneratedRoutes';

class App extends PureComponent {
  componentDidMount() {
    document.title = appTitle;
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <main>
          <ErrorBoundary>
            <Switch>
              <GeneratedRoutes />
            </Switch>
          </ErrorBoundary>
        </main>
        <footer>
          <span className={styles.copyright}>{COPYRIGHT}</span>
        </footer>
      </div>
    );
  }
}

export default App;
