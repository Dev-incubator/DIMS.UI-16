import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import styles from './Tasks.module.css';
import { TaskRow } from './taskRow/TaskRow';
import { ALERT_MODES, DELETE_VALUES, MODAL_MODES, PAGE_TITLES } from '../../constants/libraries';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import TaskModal from '../modals/taskModals/taskModal/TaskModal';
import { withModal } from '../../HOCs/withModal';
import { ThemeContext } from '../../providers/ThemeProvider';
import { getUsersThunk } from '../../redux/users/thunks/usersThunk';
import { addTaskThunk, getTasksThunk, removeTaskThunk, updateTaskThunk } from '../../redux/tasks/thunks/tasksThunk';
import { Loading } from '../loading/Loading';
import { CustomAlert } from '../../components/Alert/Alert';

const tableTitles = ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Action'];

function Tasks({
  mode,
  actionId,
  openModal,
  closeModal,
  tasks,
  users,
  isFetching,
  error,
  addTask,
  removeTask,
  updateTask,
  getTasks,
  getUsers,
}) {
  useEffect(() => {
    getTasks();
    getUsers();
  }, [getTasks, getUsers]);

  const updateTaskHandler = (data) => {
    updateTask(actionId, data);
    closeModal();
  };

  const addTaskHandler = (task) => {
    addTask(task);
    closeModal();
  };

  const removeTaskHandler = () => {
    removeTask(actionId);
    closeModal();
  };
  const actionTask = tasks.find((task) => task.id === actionId);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          {isFetching && <Loading />}
          <CustomAlert isActive={!!error} variant={ALERT_MODES.fail} text={error} />
          <PageHeader text={PAGE_TITLES.tasks} onClick={openModal} />
          <table className={`${styles.tasks} ${styles[theme]}`}>
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
              addTask={addTaskHandler}
              task={actionTask}
              readOnly={mode === MODAL_MODES.read}
              updateTask={updateTaskHandler}
              onClose={closeModal}
            />
          ) : null}
          {mode === MODAL_MODES.delete && (
            <DeleteModal onRemove={removeTaskHandler} onClose={closeModal} target={DELETE_VALUES.task} />
          )}
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users,
    tasks: state.tasks,
    isFetching: state.tasksLoader,
    error: state.tasksError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUsers: getUsersThunk,
      getTasks: getTasksThunk,
      updateTask: updateTaskThunk,
      removeTask: removeTaskThunk,
      addTask: addTaskThunk,
    },
    dispatch,
  );
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
  mode: PropTypes.string.isRequired,
  actionId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withModal(Tasks));
