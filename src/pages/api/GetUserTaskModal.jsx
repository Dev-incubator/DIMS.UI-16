import PropTypes from 'prop-types';
import { useState } from 'react';
import { withModalFade } from '../../HOCs/withModalFade';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../modals/form/ModalFields/Input/Input';
import { FormSubmit } from '../modals/form/formSubmit/FormSubmit';
import { BUTTON_COLORS } from '../../constants/libraries';

const INPUT_NAMES = {
  taskId: 'taskId',
  userId: 'userId',
};

const GetUserTaskModal = ({ active, onClose, getUserTask, setFade }) => {
  const [taskId, setTaskId] = useState('');
  const [userId, setUserId] = useState('');

  const onSubmit = () => {
    getUserTask(userId, taskId);
    setFade();
  };

  const onInputChange = (name, value) => {
    if (name === INPUT_NAMES.taskId) {
      setTaskId(value);
    } else {
      setUserId(value);
    }
  };

  return (
    <Modal active={active} onClose={onClose}>
      <div>
        <Input
          value={taskId}
          title='Task Id'
          fieldName={INPUT_NAMES.taskId}
          onChange={onInputChange}
          autoComplete='off'
          placeholder='Type task id'
        />
        <Input
          value={userId}
          title='User Id'
          fieldName={INPUT_NAMES.userId}
          autoComplete='off'
          onChange={onInputChange}
          placeholder='Type user id'
        />
      </div>
      <FormSubmit
        onClose={onClose}
        onSubmit={onSubmit}
        submitButtonColor={BUTTON_COLORS.blue}
        submitButtonValue='Get task'
        backButtonValue='Go back'
      />
    </Modal>
  );
};

GetUserTaskModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFade: PropTypes.func.isRequired,
  getUserTask: PropTypes.func.isRequired,
};

export default withModalFade(GetUserTaskModal);
