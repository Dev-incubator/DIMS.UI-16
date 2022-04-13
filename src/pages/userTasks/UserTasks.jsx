import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './UserTasks.module.css';
import { UserTaskRow } from './userTaskRow/UserTaskRow';
import { getTaskById, getUserById, getUserTasksById, updateTask } from '../../scripts/api-service';
import { Loading } from '../../components/Loading/Loading';

const tableTitles = ['#', 'Task name', 'Start date', 'Deadline', 'Status', 'Update status'];

export class UserTasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: null,
    };
  }

  async componentDidMount() {
    await this.updateData();
  }

  updateData = async () => {
    const { match } = this.props;
    const userId = match.params.id;
    const user = await getUserById(userId);
    const tasks = await getUserTasksById(userId);
    this.setState((prevState) => ({ ...prevState, name: user.name, tasks }));
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
    if (!name) {
      return <Loading />;
    }

    return (
      <div>
        <PageHeader text={`${name}'s current tasks`} isBackButton />
        <table className={styles.userTasks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tasks.map((task, index) => (
              <UserTaskRow
                key={task.id}
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
    );
  }
}

UserTasks.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) }).isRequired,
};
