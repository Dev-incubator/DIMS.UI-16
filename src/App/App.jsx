import { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import { About } from '../pages/about/About';
import { COPYRIGHT } from '../constants/libraries';
import { AuthContext } from '../providers/AuthProvider';

class App extends PureComponent {
  componentDidMount() {
    document.title = appTitle;
  }

  generateRoutes = () => {
    const { user } = this.context;

    return (
      <div>
        <Route path='/about' exact component={About} />
        {user ? (
          <div>
            <Route path='/users' exact component={Members} />
            <Route path='/tasks' exact component={Tasks} />
            <Route path='/progress/:id' component={Progress} />
            <Route path='/tasks/:id' component={UserTasks} />
            <Route path='/track/:userId/:taskId' component={Tracks} />
          </div>
        ) : (
          <div>
            <Route path='/login' exact component={LogIn} />
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <main>
          <Switch>{this.generateRoutes()}</Switch>
        </main>
        <footer>
          <span className={styles.copyright}>{COPYRIGHT}</span>
        </footer>
      </div>
    );
  }
}

App.contextType = AuthContext;

export default App;
