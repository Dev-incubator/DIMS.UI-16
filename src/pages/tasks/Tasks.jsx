import { useEffect, useState } from 'react';
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

function Tasks({ addTask, getTasks, getUsers, updateTask, removeTask, users, tasks, isFetching, error }) {
  const [modalValues, setModalValues] = useState({ mode: null, actionId: null });

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  const updateTaskHandler = (updatedTask) => {
    updateTask(modalValues.actionId, updatedTask);
    disableModalMode();
  };

  const addTaskHandler = (task) => {
    addTask(task);
    disableModalMode();
  };

  const removeTaskHandler = () => {
    removeTask(modalValues.actionId);
    disableModalMode();
  };

  const setModalMode = (mode, actionId = null) => {
    setModalValues({ mode, actionId });
  };

  const disableModalMode = () => {
    setModalValues({ mode: null, actionId: null });
  };

  const actionTask = tasks.find((task) => task.id === modalValues.actionId);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div>
          {isFetching && <Loading />}
          <CustomAlert isActive={!!error} variant={ALERT_MODES.fail} text={error} />
          <PageHeader text={PAGE_TITLES.tasks} onClick={() => setModalMode(MODAL_MODES.create)} />
          <table className={styles.tasks} style={{ color: theme.textColor }}>
            <TableHeader titles={tableTitles} />
            <tbody>
              {tasks.map((task, index) => {
                const setEditMode = () => {
                  setModalMode(MODAL_MODES.edit, task.id);
                };
                const setReadMode = () => {
                  setModalMode(MODAL_MODES.read, task.id);
                };
                const setDeleteMode = () => {
                  setModalMode(MODAL_MODES.delete, task.id);
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
            addTask={addTaskHandler}
            task={actionTask}
            readOnly={modalValues.mode === MODAL_MODES.read}
            updateTask={updateTaskHandler}
            disableModalMode={disableModalMode}
            active={!!modalValues.mode && modalValues.mode !== MODAL_MODES.delete}
          />
          <DeleteModal
            active={modalValues.mode === MODAL_MODES.delete}
            removeHandler={removeTaskHandler}
            cancelHandler={disableModalMode}
            target={DELETE_VALUES.task}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  );
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
