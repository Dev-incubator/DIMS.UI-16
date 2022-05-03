import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createTask,
  createUser,
  getTask,
  getTasks,
  getUser,
  getUsers,
  getUserTask,
  logIn,
  removeUser,
  updateTask,
} from './api';
import styles from './ApiTest.module.css';
import Button from '../../components/Buttons/Button/Button';
import { BUTTON_COLORS } from '../../constants/libraries';
import { withModal } from '../../HOCs/withModal';
import AddUserModal from './AddUserModal';
import UniversalModal from './UniversalModal';
import LoginModal from './LoginModal';
import { ErrorToast } from '../../components/Toasts/ErrorToast';
import { MODAL_TYPES, FIELDS, defaultErrorValue, BUTTON_TITLES, STORAGE_KEYS } from './constants';
import { ThemeContext } from '../../providers/ThemeProvider';
import TaskModal from './TaskModal';
import { getCurrentUserId, getToken } from './storage';

const Swagger = ({ mode, closeModal, openModal, history, actionId }) => {
  useEffect(() => {
    if (!getToken() || !getCurrentUserId()) {
      openModal(MODAL_TYPES.login);
    }
  }, [openModal]);
  useEffect(() => {
    setError('');
    if (mode) {
      closeToast();
    }
  }, [mode]);
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState();
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const closeToast = () => {
    setToast('');
  };

  const getUsersHandler = async () => {
    const users = await getUsers();
    setData(users);
  };

  const getUserTaskHandler = async (values) => {
    const { userId, taskId } = values;
    const task = await getUserTask(userId, taskId);
    if (task) {
      setData(task);
    } else {
      setToast('Nothing found');
    }
    closeModal();
  };

  const getTaskHandler = async (values) => {
    const { taskId } = values;
    const task = await getTask(taskId);
    if (task) {
      setData(task);
    } else {
      setToast('Nothing found');
    }
    closeModal();
  };

  const createTaskHandler = async (taskData) => {
    const addedTask = await createTask(taskData);
    if (addedTask) {
      setData(addedTask);
      closeModal();
    } else {
      setError(defaultErrorValue);
    }
  };

  const updateTaskHandler = async (taskData) => {
    const updatedTask = await updateTask(actionId, taskData);
    if (updatedTask) {
      setData(updatedTask);
      closeModal();
    } else {
      setError(defaultErrorValue);
    }
  };

  const createUserHandler = async (formData) => {
    const userData = {
      ...formData,
      roles: [formData.roles],
      mathScore: Number(formData.mathScore),
      universityAverageScore: Number(formData.universityAverageScore),
    };
    const user = await createUser(userData);
    if (user) {
      setData(user);
      closeModal();
    } else {
      setError(defaultErrorValue);
    }
  };

  const getUserHandler = async (values) => {
    const { userId } = values;
    const user = await getUser(userId);
    if (user) {
      setData(user);
    } else {
      setToast('No such user');
    }
    closeModal();
  };

  const setTaskIdHandler = async (values) => {
    const { taskId } = values;
    const task = await getTask(taskId);
    if (task) {
      openModal(MODAL_TYPES.updateTask, taskId);
    } else {
      setToast('No such task');
      closeModal();
    }
  };

  const getTasksHandler = async () => {
    const tasks = await getTasks();
    setData(tasks);
  };

  const removeUserHandler = async (values) => {
    const { userId } = values;
    if (userId !== getCurrentUserId()) {
      const removedUser = await removeUser(userId);
      if (removedUser) {
        setData(removedUser);
      } else {
        setToast('No such user');
      }
    } else {
      setToast("You can't remove yourself");
    }
    closeModal();
  };

  const clearData = () => {
    setData();
  };

  const logInHandler = async (email, password) => {
    const token = await logIn(email, password);
    if (token) {
      setData(token);
      closeModal();
    } else {
      setError(defaultErrorValue);
    }
  };

  const leavePage = () => {
    history.push('/about');
  };

  const logOutHandler = () => {
    clearData();
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.userId);
    openModal(MODAL_TYPES.login);
  };

  return (
    <div className={`${styles.content} ${styles[theme]}`}>
      <ErrorToast onClose={closeToast} active={!!toast} message={toast} delay={3000} />
      <div className={styles.buttonGroup}>
        <Button onClick={() => openModal(MODAL_TYPES.addUser)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.addUser}
        </Button>
        <Button onClick={getUsersHandler} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.getUsers}
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.getUser)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.getUser}
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.removeUser)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.removeUser}
        </Button>
        <Button onClick={getTasksHandler} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.getTasks}
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.addTask)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.addTask}
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.getTask)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.getTask}
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.setTaskId)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.updateTask}
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.getUserTask)} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.getUserTask}
        </Button>
        <Button onClick={clearData} color={BUTTON_COLORS.blue}>
          {BUTTON_TITLES.clear}
        </Button>
        <Button onClick={logOutHandler} color={BUTTON_COLORS.red}>
          {BUTTON_TITLES.logOut}
        </Button>
      </div>
      <div className={`${styles.result} ${styles[theme]}`}>{JSON.stringify(data)}</div>
      {mode === MODAL_TYPES.getUserTask && (
        <UniversalModal
          title={BUTTON_TITLES.getUserTask}
          fields={[FIELDS.taskId, FIELDS.userId]}
          onClose={closeModal}
          onSubmit={getUserTaskHandler}
        />
      )}
      {mode === MODAL_TYPES.login && <LoginModal logIn={logInHandler} onClose={leavePage} error={error} />}
      {mode === MODAL_TYPES.getTask && (
        <UniversalModal
          title={BUTTON_TITLES.getTask}
          fields={[FIELDS.taskId]}
          onClose={closeModal}
          onSubmit={getTaskHandler}
        />
      )}
      {mode === MODAL_TYPES.addUser && <AddUserModal addUser={createUserHandler} onClose={closeModal} error={error} />}
      {mode === MODAL_TYPES.addTask && (
        <TaskModal title={BUTTON_TITLES.addTask} submitTask={createTaskHandler} onClose={closeModal} error={error} />
      )}
      {mode === MODAL_TYPES.removeUser && (
        <UniversalModal
          title={BUTTON_TITLES.removeUser}
          fields={[FIELDS.userId]}
          onClose={closeModal}
          onSubmit={removeUserHandler}
        />
      )}
      {mode === MODAL_TYPES.getUser && (
        <UniversalModal
          title={BUTTON_TITLES.getUser}
          onClose={closeModal}
          onSubmit={getUserHandler}
          fields={[FIELDS.userId]}
        />
      )}
      {mode === MODAL_TYPES.setTaskId && (
        <UniversalModal
          title={BUTTON_TITLES.setTaskId}
          onClose={closeModal}
          onSubmit={setTaskIdHandler}
          fields={[FIELDS.taskId]}
        />
      )}
      {mode === MODAL_TYPES.updateTask && (
        <TaskModal
          title={BUTTON_TITLES.updateTask}
          taskId={Number(actionId)}
          onClose={closeModal}
          error={error}
          submitTask={updateTaskHandler}
        />
      )}
    </div>
  );
};

Swagger.propTypes = {
  actionId: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withModal(Swagger);
