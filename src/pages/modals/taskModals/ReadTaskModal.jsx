import PropTypes from 'prop-types';
import { MODAL_TITLES } from '../../../scripts/libraries';
import { TaskModal } from './taskModal/TaskModal';
import { changeDateFormat } from '../../../scripts/helpers';

export function ReadTaskModal({ disableModalMode, task, users }) {
  const usersTask = users.filter((user) => task.users.some((item) => item.id === user.id));

  return (
    <TaskModal
      users={usersTask}
      closeModal={disableModalMode}
      modalTitle={MODAL_TITLES.read}
      title={task.title}
      description={task.description}
      deadline={changeDateFormat(task.deadline)}
      startDate={changeDateFormat(task.startDate)}
      readOnly
    />
  );
}

ReadTaskModal.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    deadline: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        status: PropTypes.string,
      }),
    ),
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  disableModalMode: PropTypes.func.isRequired,
};
