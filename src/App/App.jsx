import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { appTitle } from '../config';
import './App.css';
import styles from './App.module.css';
import { Members } from '../pages/members/Members';
import { Progress } from '../pages/members/progress/Progress';
import { UserTasks } from '../pages/members/userTasks/UserTasks';
import { Tracks } from '../pages/members/tracks/Tracks';
import { Tasks } from '../pages/tasks/Tasks';
import { Header } from './header/Header';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/users' exact component={Members} />
        <Route path='/tasks' exact component={Tasks} />
        <Route path='/progress/:id' component={Progress} />
        <Route path='/tasks/:id' component={UserTasks} />
        <Route path='/track/:userId/:taskId' component={Tracks} />
      </Switch>
      <footer>
        <span className={styles.copyright}>© Dev Incubator</span>
      </footer>
    </div>
  );
};
