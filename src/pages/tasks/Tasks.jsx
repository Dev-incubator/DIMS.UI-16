import { PureComponent } from 'react';
import { addTask, deleteTask, deleteTrack, getAllTasks, getAllUsers, updateTask } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import { deepEqual } from '../../scripts/helpers';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import TaskModal from '../modals/taskModals/taskModal/TaskModal';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

export class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
      modalMode: null,
      actionTaskId: null,
    };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!deepEqual(prevState, this.state)) {
      await this.getData();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getData = async () => {
    const tasks = await getAllTasks();
    const users = await getAllUsers();
    if (this.isComponentMounted) {
      this.setState((prevState) => ({ ...prevState, users, tasks }));
    }
  };

  updateTask = async (updatedTask) => {
    const { actionTaskId, tasks } = this.state;
    const prevTask = tasks.find((task) => task.id === actionTaskId);
    const { users } = updatedTask;
    const prevUsers = prevTask.users;
    const updatedUsers = users.map((user) => {
      const item = prevUsers.find((el) => el.userId === user.userId);

      return item ? { ...user, status: item.status } : user;
    });
    if (!deepEqual(prevTask, { ...updatedTask, id: actionTaskId, users: updatedUsers })) {
      await updateTask(actionTaskId, { ...updatedTask, users: updatedUsers });
      prevUsers.forEach(async (user) => {
        if (!users.some((item) => item.userId === user.userId)) {
          await deleteTrack(user.userId);
        }
      });
    }
    this.disableModalMode();
  };

  addTask = async (task) => {
    await addTask(task);
    this.disableModalMode();
  };

  removeTask = async () => {
    const { actionTaskId } = this.state;
    await deleteTask(actionTaskId);
    this.disableModalMode();
  };

  setModalMode = (modalMode, actionTaskId = null) => {
    this.setState({ modalMode, actionTaskId });
  };

  disableModalMode = () => {
    setTimeout(() => {
      this.setState({ modalMode: null, actionTaskId: null });
    }, 300);
  };

  render() {
    const { tasks, modalMode, users, actionTaskId } = this.state;
    const actionTask = tasks.find((task) => task.id === actionTaskId);

    return (
      <div>
        <PageHeader text={PAGE_TITLES.tasks} onClick={() => this.setModalMode(MODAL_MODES.create)} />
        <table className={styles.tasks}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {tasks.map((task, index) => {
              const setEditMode = () => {
                this.setModalMode(MODAL_MODES.edit, task.id);
              };
              const setReadMode = () => {
                this.setModalMode(MODAL_MODES.read, task.id);
              };
              const setDeleteMode = () => {
                this.setModalMode(MODAL_MODES.delete, task.id);
              };

              return (
                <TaskRow
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  deadline={task.deadline}
                  startDate={task.startDate}
                  number={index + 1}
                  setEditMode={setEditMode}
                  setDeleteMode={setDeleteMode}
                  setReadMode={setReadMode}
                />
              );
            })}
          </tbody>
        </table>
        {modalMode && modalMode !== MODAL_MODES.delete ? (
          <TaskModal
            users={users}
            addTask={this.addTask}
            task={actionTask}
            readOnly={modalMode === MODAL_MODES.read}
            updateTask={this.updateTask}
            disableModalMode={this.disableModalMode}
          />
        ) : null}
        {modalMode === MODAL_MODES.delete && (
          <DeleteModal
            removeHandler={this.removeTask}
            disableModalMode={this.disableModalMode}
            target={DELETE_VALUES.task}
          />
        )}
      </div>
    );
  }
}
