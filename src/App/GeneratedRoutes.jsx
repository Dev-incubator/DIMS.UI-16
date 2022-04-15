import { Route } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { About } from '../pages/about/About';
import Members from '../pages/members/Members';
import Tasks from '../pages/tasks/Tasks';
import { Progress } from '../pages/progress/Progress';
import { UserTasks } from '../pages/userTasks/UserTasks';
import Tracks from '../pages/tracks/Tracks';
import LogIn from '../pages/logIn/LogIn';
import { SetPassword } from '../pages/setPassword/SetPassword';
import { Settings } from '../pages/settings/Settings';
import { USER_ROLES } from '../constants/libraries';
import store from '../redux/store';

export function GeneratedRoutes() {
  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <>
          <Route path='/about' exact component={About} />
          {user ? (
            <>
              {user.role === USER_ROLES.admin || user.role === USER_ROLES.mentor ? (
                <>
                  <Route path='/users' exact render={() => <Members store={store} />} />
                  <Route path='/tasks' exact render={() => <Tasks store={store} />} />
                  <Route path='/progress/:id' component={Progress} />
                </>
              ) : (
                <Route path='/track/:userId/task/:taskId' component={Tracks} />
              )}
              <Route path='/tasks/:id' render={({ match }) => <UserTasks match={match} />} />
              <Route path='/settings/:id' component={Settings} />
            </>
          ) : (
            <>
              <Route path='/login' exact component={LogIn} />
              <Route path='/resetPassword' component={SetPassword} />
            </>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
}
