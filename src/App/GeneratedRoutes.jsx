import { Route } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { About } from '../pages/about/About';
import { Members } from '../pages/members/Members';
import { Tasks } from '../pages/tasks/Tasks';
import { Progress } from '../pages/progress/Progress';
import { UserTasks } from '../pages/userTasks/UserTasks';
import { Tracks } from '../pages/tracks/Tracks';
import LogIn from '../pages/logIn/LogIn';

export function GeneratedRoutes() {
  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <>
          <Route path='/about' exact component={About} />
          {user ? (
            <>
              <Route path='/users' exact component={Members} />
              <Route path='/tasks' exact component={Tasks} />
              <Route path='/progress/:id' component={Progress} />
              <Route path='/tasks/:id' component={UserTasks} />
              <Route path='/track/:userId/:taskId' component={Tracks} />
            </>
          ) : (
            <Route path='/login' exact component={LogIn} />
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
}
