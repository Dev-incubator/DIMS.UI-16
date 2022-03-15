import { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { appTitle } from '../config';
import './App.css';
import styles from './App.module.css';
import { Members } from '../pages/members/Members';
import { Progress } from '../pages/progress/Progress';
import { UserTasks } from '../pages/userTasks/UserTasks';
import { Tracks } from '../pages/tracks/Tracks';
import { Tasks } from '../pages/tasks/Tasks';
import { Header } from './header/Header';
import { LogIn } from '../pages/logIn/LogIn';
import { auth } from '../scripts/firebase-config';
import { About } from '../pages/about/About';
import { login } from '../scripts/api-service';
import { SetPassword } from '../pages/setPassword/SetPassword';

onAuthStateChanged(auth, (currentUser) => {
  localStorage.setItem('user', JSON.stringify(currentUser));
});

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    document.title = appTitle;
    this.auth();
  }

  auth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ user });
  };

  logOut = async () => {
    await signOut(auth);
    this.auth();
  };

  logIn = async (email, password) => {
    const error = await login(email, password);
    this.auth();

    return error;
  };

  render() {
    const { user } = this.state;

    return (
      <div className={styles.App}>
        <Header user={user} logout={this.logOut} />
        <main>
          {user ? (
            <Switch>
              <Route path='/users' exact component={Members} />
              <Route path='/tasks' exact component={Tasks} />
              <Route path='/progress/:id' component={Progress} />
              <Route path='/tasks/:id' component={UserTasks} />
              <Route path='/track/:userId/task/:taskId' component={Tracks} />
              <Route path='/about' exact component={About} />
              <Redirect from='/login' to='/users' />
            </Switch>
          ) : (
            <Switch>
              <Route path='/about' exact component={About} />
              <Route path='/login' exact render={() => <LogIn logIn={this.logIn} />} />
              <Route path='/resetPassword' component={SetPassword} />
              <Redirect to='/login' />
            </Switch>
          )}
        </main>
        <footer>
          <span className={styles.copyright}>© Oleg Yanusik</span>
        </footer>
      </div>
    );
  }
}
