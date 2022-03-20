import { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { appTitle } from '../config';
import './App.css';
import styles from './App.module.css';
import { Header } from './header/Header';
import { auth } from '../scripts/firebase-config';
import { getUserById, login } from '../scripts/api-service';
import { COPYRIGHT, USER_ROLES } from '../scripts/libraries';
import { UserRoutes } from './routes/UserRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { SpectatorRoutes } from './routes/SpectatorRoutes';
import { themes, ThemeContext } from '../providers/ThemeProvider';

onAuthStateChanged(auth, (currentUser) => {
  localStorage.setItem('user', JSON.stringify(currentUser));
});

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleTheme = (value) => {
      localStorage.setItem('theme', value);
      this.setState((prevState) => ({
        ...prevState,
        themeContext: { ...prevState.themeContext, theme: themes[value] },
      }));
    };

    this.state = {
      user: null,
      themeContext: {
        theme: themes.light,
        toggleTheme: this.toggleTheme,
      },
    };
    this.isUserDataSetted = false;
  }

  async componentDidMount() {
    document.title = appTitle;
    await this.auth();
    this.setStartTheme();
  }

  auth = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.isUserDataSetted = true;
    if (user) {
      const currentUser = await getUserById(user.uid);
      this.setState({ user: currentUser });
    } else {
      this.setState({ user });
    }
  };

  setStartTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setState((prevState) => ({
        ...prevState,
        themeContext: { ...prevState.themeContext, theme: themes[theme] },
      }));
    }
  };

  logOut = async () => {
    await signOut(auth);
    await this.auth();
  };

  logIn = async (email, password) => {
    const { history } = this.props;
    const error = await login(email, password);
    await this.auth();
    history.push('/about');

    return error;
  };

  render() {
    const { user, themeContext } = this.state;
    const { theme } = themeContext;
    if (!this.isUserDataSetted) {
      return null;
    }

    return (
      <ThemeContext.Provider value={themeContext}>
        <div className={styles.App} style={{ backgroundColor: theme.backgroundColor }}>
          <Header user={user} logout={this.logOut} />
          <main>
            {user ? (
              <Switch>
                {user.role === USER_ROLES.admin || user.role === USER_ROLES.mentor ? (
                  <AdminRoutes role={user.role} />
                ) : (
                  <UserRoutes />
                )}
              </Switch>
            ) : (
              <Switch>
                <SpectatorRoutes logIn={this.logIn} />
              </Switch>
            )}
          </main>
          <footer>
            <span className={styles.copyright}>{COPYRIGHT}</span>
          </footer>
        </div>
      </ThemeContext.Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(App);
