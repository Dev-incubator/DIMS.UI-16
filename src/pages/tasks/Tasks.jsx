import { PureComponent } from 'react';
import { addTask, getAllTasks, getAllUsers } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { MODAL_MODES } from '../../scripts/libraries';
import { ReadTaskModal } from '../modals/taskModals/ReadTaskModal';
import { CreateTaskModal } from '../modals/taskModals/CreateTaskModal';
import { EditTaskModal } from '../modals/taskModals/EditTaskModal';

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
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate() {
    await this.getData();
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getData = async () => {
    const tasks = await getAllTasks();
    const users = await getAllUsers();
    if (this.isComponentMounted) {
      this.setState((prevState) => ({ ...prevState, tasks, users }));
    }
  };

  addTask = async (task) => {
    await addTask(task);
    this.disableModalMode();
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
        {modalMode === MODAL_MODES.read && (
          <ReadTaskModal task={actionTask} users={users} disableModalMode={this.disableModalMode} />
        )}
        {modalMode === MODAL_MODES.create && (
          <CreateTaskModal addTask={this.addTask} users={users} disableModalMode={this.disableModalMode} />
        )}
        {modalMode === MODAL_MODES.edit && (
          <EditTaskModal
            task={actionTask}
            disableModalMode={this.disableModalMode}
            updateTask={() => console.log('updating...')}
            users={users}
          />
        )}
      </div>
    );
  }
}
