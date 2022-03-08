import { useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { appTitle } from '../config';
import classes from './App.module.css';
import './App.css';
import { Members } from '../pages/members/Members';
import { Progress } from '../pages/members/progress/Progress';
import { UserTasks } from '../pages/members/userTasks/UserTasks';
import { Tracks } from '../pages/members/tracks/Tracks';
import { Tasks } from '../pages/tasks/Tasks';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <div className={classes.App}>
      <header className={classes.links}>
        <NavLink to='/users'>Members</NavLink>
        <NavLink to='/tasks'>Tasks</NavLink>
      </header>
      <Switch>
        <Route path='/users' exact component={Members} />
        <Route path='/tasks' exact component={Tasks} />
        <Route path='/progress/:id' component={Progress} />
        <Route path='/tasks/:id' component={UserTasks} />
        <Route path='/track/:userId/:taskId' component={Tracks} />
      </Switch>
    </div>
  );
};
