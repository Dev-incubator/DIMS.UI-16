import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTask, getToken, getUsers, logIn } from './api';
import styles from './ApiTest.module.css';
import Button from '../../components/Buttons/Button/Button';
import { BUTTON_COLORS } from '../../constants/libraries';
import { withModal } from '../../HOCs/withModal';
import GetTaskModal from './GetTaskModal';
import LoginModal from './LoginModal';

const MODAL_TYPES = {
  login: 'login',
  getTask: 'get task',
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

  const getTaskHandler = async (userId, taskId) => {
    const task = await getTask(userId, taskId);
    setData(task);
    closeModal();
  };

  const clearData = () => {
    setData();
  };

  const logInHandler = async (email, password) => {
    const token = await logIn(email, password);
    console.log(token);
    if (token) {
      setData(token);
      closeModal();
    } else {
      setError('Data is incorrect');
    }
  };

  const leavePage = () => {
    history.push('/about');
  };

  return (
    <div className={styles.content}>
      <div className={styles.buttonGroup}>
        <Button onClick={getUsersHandler} color={BUTTON_COLORS.blue}>
          Get users
        </Button>
        <Button onClick={() => openModal(MODAL_TYPES.getTask)} color={BUTTON_COLORS.blue}>
          Get task
        </Button>
        <Button onClick={clearData} color={BUTTON_COLORS.red}>
          Clear
        </Button>
      </div>
      <div className={styles.result}>{JSON.stringify(data)}</div>
      {mode === MODAL_TYPES.getTask && <GetTaskModal onClose={closeModal} getTask={getTaskHandler} />}
      {mode === MODAL_TYPES.login && <LoginModal onClose={leavePage} logIn={logInHandler} error={error} />}
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
