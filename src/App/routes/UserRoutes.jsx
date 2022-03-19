import { Route } from 'react-router-dom';
import { UserTasks } from '../../pages/userTasks/UserTasks';
import { Tracks } from '../../pages/tracks/Tracks';
import { About } from '../../pages/about/About';
import { Settings } from '../../pages/settings/Settings';
import { USER_ROLES } from '../../scripts/libraries';

export function UserRoutes() {
  return (
    <div>
      <Route path='/tasks/:id' render={({ match }) => <UserTasks match={match} role={USER_ROLES.user} />} />
      <Route path='/track/:userId/task/:taskId' component={Tracks} />
      <Route path='/settings/:id' component={Settings} />
      <Route path='/about' exact component={About} />
    </div>
  );
}
