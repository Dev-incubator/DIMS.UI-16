import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Members } from '../../pages/members/Members';
import { Tasks } from '../../pages/tasks/Tasks';
import { Progress } from '../../pages/progress/Progress';
import { UserTasks } from '../../pages/userTasks/UserTasks';
import { About } from '../../pages/about/About';
import { Settings } from '../../pages/settings/Settings';

export function AdminRoutes({ role }) {
  return (
    <div>
      <Route path='/users' exact render={() => <Members role={role} />} />
      <Route path='/tasks' exact component={Tasks} />
      <Route path='/progress/:id' component={Progress} />
      <Route path='/settings/:id' component={Settings} />
      <Route path='/tasks/:id' render={({ match }) => <UserTasks match={match} role={role} />} />
      <Route path='/about' exact component={About} />
    </div>
  );
}

AdminRoutes.propTypes = {
  role: PropTypes.string.isRequired,
};
