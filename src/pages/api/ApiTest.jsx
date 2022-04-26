import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUser, getTask, getToken, getUsers, getUserTask, logIn } from './api';
import styles from './ApiTest.module.css';
import Button from '../../components/Buttons/Button/Button';
import { BUTTON_COLORS } from '../../constants/libraries';
import { withModal } from '../../HOCs/withModal';
import LoginModal from './LoginModal';
import GetUserTaskModal from './GetUserTaskModal';
import GetTaskModal from './GetTaskModal';
import AddUserModal from './AddUserModal';

const MODAL_TYPES = {
  login: 'login',
  getUserTask: 'get user task',
  getTask: 'get task',
  addUser: 'add user',
};

const ApiTest = ({ mode, closeModal, openModal, history }) => {
  useEffect(() => {
    if (!getToken()) {
      openModal(MODAL_TYPES.login);
    }
  }, []);
  const [data, setData] = useState();
  const [error, setError] = useState('');

  const getUsersHandler = async () => {
    const users = await getUsers();
    setData(users);
  };

  const getUserTaskHandler = async (userId, taskId) => {
    const task = await getUserTask(userId, taskId);
    setData(task);
    closeModal();
  };

  const getTaskHandler = async (taskId) => {
    const task = await getTask(taskId);
    setData(task);
    closeModal();
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
      setError('Something went wrong, is all fields are valid?');
    }
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
      setError('Data is incorrect');
    }
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    history.push('/about');
  };

  const leavePage = () => {
    history.push('/about');
  };

  return (
    <div className={styles.content}>
      <div className={styles.buttonGroup}>
        <Button onClick={() => openModal(MODAL_TYPES.addUser)} color={BUTTON_COLORS.blue}>
          Add user
        </Button>
        <Button onClick={getUsersHandler} color={BUTTON_COLORS.blue}>
          Get users
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.getTask)} color={BUTTON_COLORS.blue}>
          Get task
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.getUserTask)} color={BUTTON_COLORS.blue}>
          Get user task
        </Button>
        <Button onClick={clearData} color={BUTTON_COLORS.blue}>
          Clear
        </Button>
        <Button onClick={removeToken} color={BUTTON_COLORS.red}>
          Remove token
        </Button>
      </div>
      <div className={styles.result}>{JSON.stringify(data)}</div>
      {mode === MODAL_TYPES.getUserTask && <GetUserTaskModal onClose={closeModal} getUserTask={getUserTaskHandler} />}
      {mode === MODAL_TYPES.login && <LoginModal onClose={leavePage} logIn={logInHandler} error={error} />}
      {mode === MODAL_TYPES.getTask && <GetTaskModal onClose={closeModal} getTask={getTaskHandler} />}
      {mode === MODAL_TYPES.addUser && <AddUserModal addUser={createUserHandler} onClose={closeModal} error={error} />}
    </div>
  );
};

ApiTest.propTypes = {
  mode: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withModal(ApiTest);
