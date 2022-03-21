import { PureComponent } from 'react';
import { getAllTasks, getAllUsers } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { TaskModal } from '../modals/createModals/taskModal/TaskModal';
import { MODAL_MODES } from '../../scripts/libraries';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

export class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      modalMode: null,
      users: [],
      actionTaskId: null,
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const tasks = await getAllTasks();
    const users = await getAllUsers();
    this.setState((prevState) => ({ ...prevState, tasks, users }));
  };

  setCreateModalMode = () => {
    this.setState({ modalMode: MODAL_MODES.create });
  };

  setReadModalMode = (taskId) => {
    this.setState({ modalMode: MODAL_MODES.read, actionTaskId: taskId });
  };

  setEditModalMode = (taskId) => {
    this.setState({ modalMode: MODAL_MODES.edit, actionTaskId: taskId });
  };

  disableModalMode = () => {
    this.setState({ modalMode: null, actionTaskId: null });
  };

  render() {
    const { tasks, modalMode, users, actionTaskId } = this.state;
    const actionTask = tasks.find((task) => task.id === actionTaskId);

    return (
      <div>
        <PageHeader text='Tasks' isBackButton={false} onClick={this.setCreateModalMode} />
        <table className={styles.tasks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                startDate={task.startDate}
                number={index + 1}
                setEditMode={this.setEditModalMode}
                setReadMode={this.setReadModalMode}
              />
            ))}
          </tbody>
        </table>
        {modalMode && (
          <TaskModal task={actionTask} users={users} mode={modalMode} disableModalMode={this.disableModalMode} />
        )}
      </div>
    );
  }
}
