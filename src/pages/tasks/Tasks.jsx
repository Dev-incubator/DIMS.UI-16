import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { ALERT_MODES, DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../scripts/libraries';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { TaskModal } from '../modals/taskModals/taskModal/TaskModal';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Loading } from '../loading/Loading';
import { getUsersThunk } from '../../redux/usersThunk/userThunks';
import { CustomAlert } from '../../components/Alert/Alert';
import { addTaskThunk, getTasksThunk, removeTaskThunk, updateTaskThunk } from '../../redux/tasksThunk/tasksThunk';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalMode: null,
      actionTaskId: null,
    };
  }

  async componentDidMount() {
    const { getTasks, getUsers } = this.props;
    getTasks();
    getUsers();
  }

  updateTask = (updatedTask) => {
    const { actionTaskId } = this.state;
    const { updateTask } = this.props;
    updateTask(actionTaskId, updatedTask);
    this.disableModalMode();
  };

  addTask = (task) => {
    const { addTask } = this.props;
    addTask(task);
    this.disableModalMode();
  };

  removeTask = () => {
    const { actionTaskId } = this.state;
    const { removeTask } = this.props;
    removeTask(actionTaskId);
    this.disableModalMode();
  };

  setModalMode = (modalMode, actionTaskId = null) => {
    this.setState({ modalMode, actionTaskId });
  };

  disableModalMode = () => {
    this.setState({ modalMode: null, actionTaskId: null });
  };

  render() {
    const { modalMode, actionTaskId } = this.state;
    const { users, tasks, isFetching, error } = this.props;
    const actionTask = tasks.find((task) => task.id === actionTaskId);

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            {isFetching && <Loading />}
            <CustomAlert isActive={!!error} variant={ALERT_MODES.fail} text={error} />
            <PageHeader text={PAGE_TITLES.tasks} onClick={() => this.setModalMode(MODAL_MODES.create)} />
            <table className={styles.tasks} style={{ color: theme.textColor }}>
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
            <TaskModal
              users={users}
              addTask={this.addTask}
              task={actionTask}
              readOnly={modalMode === MODAL_MODES.read}
              updateTask={this.updateTask}
              disableModalMode={this.disableModalMode}
              active={!!modalMode && modalMode !== MODAL_MODES.delete}
            />
            <DeleteModal
              active={modalMode === MODAL_MODES.delete}
              removeHandler={this.removeTask}
              cancelHandler={this.disableModalMode}
              target={DELETE_VALUES.task}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    tasks: state.tasks,
    isFetching: state.fetch.isFetching,
    error: state.fetch.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsersThunk()),
    getTasks: () => dispatch(getTasksThunk()),
    updateTask: (id, updatedTask) => dispatch(updateTaskThunk(id, updatedTask)),
    removeTask: (id) => dispatch(removeTaskThunk(id)),
    addTask: (task) => dispatch(addTaskThunk(task)),
  };
}

Tasks.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  addTask: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      direction: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      birthDate: PropTypes.string,
      education: PropTypes.string,
      startDate: PropTypes.string,
    }),
  ).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      deadline: PropTypes.string,
      startDate: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
