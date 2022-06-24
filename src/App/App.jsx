import { useLayoutEffect } from 'react';
import { Switch } from 'react-router-dom';
import { appTitle } from '../config';
import './App.css';
import styles from './App.module.css';
import { COPYRIGHT } from '../constants/libraries';
import { ErrorBoundary } from '../components/errorBoundary/ErrorBoundary';
import { GeneratedRoutes } from './GeneratedRoutes';
import { ThemeContext } from '../providers/ThemeProvider';
import Header from './header/Header';

const App = () => {
  useLayoutEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={`${styles.App} ${styles[theme]}`}>
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
      )}
    </ThemeContext.Consumer>
  );
};

export default App;
