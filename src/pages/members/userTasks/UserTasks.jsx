import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from '../../helpers/PageHeader';
import { TableHeader } from '../../helpers/TableHeader';
import styles from './UserTasks.module.css';
import { UserTaskRow } from './userTaskRow/UserTaskRow';
import { getUserById, getUserTasksById } from '../../../scripts/api-service';

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
    const { match } = this.props;
    const userId = match.params.id;
    const user = await getUserById(userId);
    const tasks = await getUserTasksById(userId);
    this.setState((prevState) => ({ ...prevState, name: user.name, tasks }));
  }

  render() {
    const { tasks, name } = this.state;
    if (!name) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <PageHeader text={`${name}'s current tasks`} />
        <table className={styles.userTasks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tasks.map((task, index) => (
              <UserTaskRow
                key={task.id}
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
