import { Route } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { About } from '../pages/about/About';
import Members from '../pages/members/Members';
import Tasks from '../pages/tasks/Tasks';
import { Progress } from '../pages/progress/Progress';
import UserTasks from '../pages/userTasks/UserTasks';
import Tracks from '../pages/tracks/Tracks';
import LogIn from '../pages/logIn/LogIn';
import { SetPassword } from '../pages/setPassword/SetPassword';
import { Settings } from '../pages/settings/Settings';
import { USER_ROLES } from '../constants/libraries';
import Swagger from '../pages/api/Swagger';

export function GeneratedRoutes() {
  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <>
          <Route path='/about' exact component={About} />
          <Route path='/api' exact component={Swagger} />
          {user ? (
            <>
              {user.role === USER_ROLES.admin || user.role === USER_ROLES.mentor ? (
                <>
                  <Route path='/users' exact component={Members} />
                  <Route path='/tasks' exact component={Tasks} />
                  <Route path='/progress/:id' component={Progress} />
                </>
              ) : (
                <Route path='/track/:userId/task/:taskId' component={Tracks} />
              )}
              <Route path='/user-tasks/:id' component={UserTasks} />
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
