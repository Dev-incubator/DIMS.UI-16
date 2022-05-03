import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './UserTasks.module.css';
import { UserTaskRow } from './userTaskRow/UserTaskRow';
import { getTaskById, getUserById, getUserTasksById, updateTask } from '../../scripts/api-service';
import { USER_ROLES } from '../../constants/libraries';
import pageStyles from '../Page.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';
import { AuthContext } from '../../providers/AuthProvider';
import { setTasksAction, updateTaskStatusAction, userTaskReducer } from './userTaskReducer/userTaskReducer';

const adminTableTitles = ['#', 'Task name', 'Start date', 'Deadline', 'Status', 'Update status'];
const userTableTitles = adminTableTitles.slice(0, adminTableTitles.length - 1);

function UserTasks({ match }) {
  const [userName, setUserName] = useState('');
  const [tasks, dispatch] = useReducer(userTaskReducer, []);

  useEffect(() => {
    const { id } = match.params;
    (async function fetchData() {
      const [user, data] = await Promise.all([getUserById(id), getUserTasksById(id)]);
      setUserName(user.name);
      dispatch(setTasksAction(data));
    })();
  }, [match.params]);

  const updateTaskStatus = async (taskId, userId, status) => {
    const task = await getTaskById(taskId);
    if (task) {
      const updatedTaskUsers = task.users.map((user) => (user.userId === userId ? { ...user, status } : user));
      await updateTask(taskId, { users: updatedTaskUsers });
      dispatch(updateTaskStatusAction(taskId, status));
    }
  };

  if (!userName) {
    return <Loading />;
  }

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <AuthContext.Consumer>
          {({ user: { role } }) => (
            <div>
              {role === USER_ROLES.user ? (
                <div className={`${styles.header} ${styles[theme]}`}>
                  <div className={pageStyles.pageTitle}>Hi {userName}! There are your current tasks</div>
                </div>
              ) : (
                <PageHeader text={`${userName}'s current tasks`} isBackButton />
              )}
              <table className={`${styles.userTasks} ${styles[theme]}`}>
                <TableHeader titles={role === USER_ROLES.user ? userTableTitles : adminTableTitles} />
                <tbody>
                  {tasks.map((task, index) => (
                    <UserTaskRow
                      key={task.id}
                      updateTaskStatus={updateTaskStatus}
                      userId={task.userId}
                      taskId={task.id}
                      title={task.title}
                      deadline={task.deadline}
                      startDate={task.startDate}
                      number={index + 1}
                      status={task.status}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AuthContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

UserTasks.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) }).isRequired,
};

export default withRouter(UserTasks);
