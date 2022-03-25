import { Route } from 'react-router-dom';
import Members from '../../pages/members/Members';
import Tasks from '../../pages/tasks/Tasks';
import { Progress } from '../../pages/progress/Progress';
import { UserTasks } from '../../pages/userTasks/UserTasks';
import { About } from '../../pages/about/About';
import { Settings } from '../../pages/settings/Settings';
import store from '../../redux/store';

export function AdminRoutes() {
  return (
    <div>
      <Route path='/users' exact render={() => <Members store={store} />} />
      <Route path='/tasks' exact render={() => <Tasks store={store} />} />
      <Route path='/progress/:id' component={Progress} />
      <Route path='/settings/:id' component={Settings} />
      <Route path='/tasks/:id' render={({ match }) => <UserTasks match={match} />} />
      <Route path='/about' exact component={About} />
    </div>
  );
}
