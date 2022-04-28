import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getTasks, getUsers } from './api';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../modals/form/ModalFields/Input/Input';
import { BUTTON_COLORS, INPUT_TYPES, MODAL_VALUES } from '../../constants/libraries';
import { FIELDS } from './constants';
import { TaskModalUsersList } from '../modals/taskModals/taskForm/TaskModalUsersList';
import { FormSubmit } from '../modals/form/formSubmit/FormSubmit';
import { Error } from '../../components/Error/Error';
import { withModalFade } from '../../HOCs/withModalFade';
import { Loading } from '../loading/Loading';
import { getCreateTaskState, getUpdateTaskState, initTaskState } from './helpers';

const TaskModal = ({ active, submitTask, error, onClose, taskId, title }) => {
  const [inputValues, setInputValues] = useState(initTaskState);
  useEffect(() => {
    (async () => {
      const allUsers = await getUsers();
      if (taskId) {
        const task = (await getTasks(taskId)).find((item) => item.taskId === taskId);
        if (task) {
          setInputValues(getUpdateTaskState(task, allUsers));
        }
      } else {
        setInputValues(getCreateTaskState(allUsers));
      }
    })();
  }, []);

  const onInputChange = (name, value) => {
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const onCheckboxChange = (id, value) => {
    const assignedUsers = inputValues.assignedUsers.map((item) => (item.id === id ? { ...item, value } : item));
    setInputValues((prevState) => ({ ...prevState, assignedUsers }));
  };

  const onSubmit = () => {
    const assignedUsers = inputValues.assignedUsers.filter((item) => item.value).map((item) => item.id);
    submitTask({ ...inputValues, assignedUsers });
  };

  if (!inputValues.assignedUsers.length) {
    return <Loading />;
  }

  return (
    <Modal active={active} onClose={onClose}>
      <h2>{title}</h2>
      <Input
        placeholder={MODAL_VALUES.name}
        fieldName={FIELDS.name}
        title={MODAL_VALUES.name}
        type={INPUT_TYPES.text}
        onChange={onInputChange}
        value={inputValues.name}
      />
      <Input
        placeholder={MODAL_VALUES.description}
        fieldName={FIELDS.description}
        title={MODAL_VALUES.description}
        type={INPUT_TYPES.text}
        onChange={onInputChange}
        value={inputValues.description}
      />
      <Input
        placeholder={MODAL_VALUES.startDate}
        fieldName={FIELDS.startDate}
        title={MODAL_VALUES.startDate}
        type={INPUT_TYPES.date}
        onChange={onInputChange}
        value={inputValues.startDate}
      />
      <Input
        placeholder={MODAL_VALUES.deadline}
        fieldName={FIELDS.deadlineDate}
        title={MODAL_VALUES.deadline}
        type={INPUT_TYPES.date}
        onChange={onInputChange}
        value={inputValues.deadlineDate}
      />
      <TaskModalUsersList usersTask={inputValues.assignedUsers} changeUserValue={onCheckboxChange} />
      {error && <Error message={error} />}
      <FormSubmit
        onClose={onClose}
        onSubmit={onSubmit}
        submitButtonColor={BUTTON_COLORS.green}
        submitButtonValue='Add task'
      />
    </Modal>
  );
};

TaskModal.propTypes = {
  title: PropTypes.string.isRequired,
  taskId: PropTypes.number,
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  submitTask: PropTypes.func.isRequired,
};

TaskModal.defaultProps = {
  taskId: null,
};

export default withModalFade(TaskModal);
