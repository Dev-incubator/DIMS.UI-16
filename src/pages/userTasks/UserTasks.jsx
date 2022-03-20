import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './UserTasks.module.css';
import { UserTaskRow } from './userTaskRow/UserTaskRow';
import { getTaskById, getUserById, getUserTasksById, updateTask } from '../../scripts/api-service';
import { USER_ROLES } from '../../scripts/libraries';
import pageStyles from '../Page.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';

const adminTableTitles = ['#', 'Task name', 'Start date', 'Deadline', 'Status', 'Update status'];
const userTableTitles = adminTableTitles.slice(0, adminTableTitles.length - 1);

export class UserTasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: null,
    };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.updateData();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  updateData = async () => {
    const { match } = this.props;
    const userId = match.params.id;
    const user = await getUserById(userId);
    const tasks = await getUserTasksById(userId);
    if (this.isComponentMounted) {
      this.setState((prevState) => ({ ...prevState, name: user.name, tasks }));
    }
  };

  updateTaskStatus = async (taskId, userId, status) => {
    const task = await getTaskById(taskId);
    if (task) {
      const updatedTaskUsers = task.users.map((user) => (user.userId === userId ? { ...user, status } : user));
      await updateTask(taskId, { users: updatedTaskUsers });
      await this.updateData();
    }
  };

  render() {
    const { tasks, name } = this.state;
    const { role } = this.props;
    if (!name) {
      return <Loading />;
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            {role === USER_ROLES.user ? (
              <div className={styles.header} style={{ color: theme.textColor }}>
                <div className={pageStyles.pageTitle}>Hi {name}! There are your current tasks</div>
              </div>
            ) : (
              <PageHeader text={`${name}'s current tasks`} isBackButton />
            )}
            <table className={styles.userTasks} style={{ color: theme.textColor }}>
              <TableHeader titles={role === USER_ROLES.user ? userTableTitles : adminTableTitles} />
              <tbody>
                {tasks.map((task, index) => (
                  <UserTaskRow
                    key={task.id}
                    role={role}
                    updateTaskStatus={this.updateTaskStatus}
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
      </ThemeContext.Consumer>
    );
  }
}

UserTasks.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) }).isRequired,
  role: PropTypes.string.isRequired,
};
