import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
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

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className={styles.App}>
      <Header user={user} />
      <main>
        {user ? (
          <Switch>
            <Route path='/users' exact component={Members} />
            <Route path='/tasks' exact component={Tasks} />
            <Route path='/progress/:id' component={Progress} />
            <Route path='/tasks/:id' component={UserTasks} />
            <Route path='/track/:userId/:taskId' component={Tracks} />
            <Route path='/about' exact component={About} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/about' exact component={About} />
            <Route path='/login' exact component={LogIn} />
            <Redirect from='/' to='/login' />
          </Switch>
        )}
      </main>
      <footer>
        <span className={styles.copyright}>© Oleg Yanusik</span>
      </footer>
    </div>
  );
};
