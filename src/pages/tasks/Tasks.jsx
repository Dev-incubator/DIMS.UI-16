import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { addTask, deleteTask, deleteTrack, getAllTasks, getAllUsers, updateTask } from '../../scripts/api-service';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import { deepEqual } from '../../scripts/helpers';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import TaskModal from '../modals/taskModals/taskModal/TaskModal';
import { withModal } from '../../HOCs/withModal';
import { ThemeContext } from '../../providers/ThemeProvider';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users: [],
    };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    await this.getData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
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

  updateTask = async (data) => {
    const { closeModal, actionId } = this.props;
    const { tasks } = this.state;
    const prevTask = tasks.find((item) => item.id === actionId);
    const { users } = data;
    const prevUsers = prevTask.users;
    const updatedUsers = users.map((user) => {
      const item = prevUsers.find((el) => el.userId === user.userId);

      return item ? { ...user, status: item.status } : user;
    });
    const updatedTask = { ...data, users: updatedUsers };
    if (!deepEqual(prevTask, { ...updatedTask, id: actionId })) {
      await updateTask(actionId, updatedTask);
      prevUsers.forEach(async (user) => {
        if (!users.some((item) => item.userId === user.userId)) {
          await deleteTrack(user.userId);
        }
      });
    }
    closeModal();
  };

  addTask = async (task) => {
    const { closeModal } = this.props;
    await addTask(task);
    closeModal();
  };

  removeTask = async () => {
    const { closeModal, actionId } = this.props;
    await deleteTask(actionId);
    closeModal();
  };

  render() {
    const { tasks, users } = this.state;
    const { mode, actionId, openModal, closeModal } = this.props;
    const actionTask = tasks.find((task) => task.id === actionId);

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            <PageHeader text={PAGE_TITLES.tasks} onClick={openModal} />
            <table className={styles.tasks} style={{ color: theme.textColor }}>
              <TableHeader titles={tableTitles} />
              <tbody>
                {tasks.map((task, index) => {
                  const openEditModal = () => {
                    openModal(MODAL_MODES.edit, task.id);
                  };
                  const openReadModal = () => {
                    openModal(MODAL_MODES.read, task.id);
                  };
                  const openDeleteModal = () => {
                    openModal(MODAL_MODES.delete, task.id);
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
                      openEditModal={openEditModal}
                      openDeleteModal={openDeleteModal}
                      openReadModal={openReadModal}
                    />
                  );
                })}
              </tbody>
            </table>
            {mode && mode !== MODAL_MODES.delete ? (
              <TaskModal
                users={users}
                addTask={this.addTask}
                task={actionTask}
                readOnly={mode === MODAL_MODES.read}
                updateTask={this.updateTask}
                onClose={closeModal}
              />
            ) : null}
            {mode === MODAL_MODES.delete && (
              <DeleteModal onRemove={this.removeTask} onClose={closeModal} target={DELETE_VALUES.task} />
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

Tasks.propTypes = {
  mode: PropTypes.string,
  actionId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

Tasks.defaultProps = {
  mode: null,
  actionId: null,
};

export default withModal(Tasks);
