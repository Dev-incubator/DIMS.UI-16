import { Component } from 'react';
import { Switch } from 'react-router-dom';
import { appTitle } from '../config';
import './App.css';
import styles from './App.module.css';
import { Header } from './header/Header';
import { COPYRIGHT, USER_ROLES } from '../scripts/libraries';
import { UserRoutes } from './routes/UserRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { SpectatorRoutes } from './routes/SpectatorRoutes';
import { ThemeContext } from '../providers/ThemeProvider';
import { AuthContext } from '../providers/AuthProvider';

class App extends Component {
  componentDidMount() {
    document.title = appTitle;
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <AuthContext.Consumer>
            {({ user }) => (
              <div className={styles.App} style={{ backgroundColor: theme.backgroundColor }}>
                <Header />
                <main>
                  {user ? (
                    <Switch>
                      {user.role === USER_ROLES.admin || user.role === USER_ROLES.mentor ? (
                        <AdminRoutes />
                      ) : (
                        <UserRoutes />
                      )}
                    </Switch>
                  ) : (
                    <Switch>
                      <SpectatorRoutes />
                    </Switch>
                  )}
                </main>
                <footer>
                  <span className={styles.copyright}>{COPYRIGHT}</span>
                </footer>
              </div>
            )}
          </AuthContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default App;
