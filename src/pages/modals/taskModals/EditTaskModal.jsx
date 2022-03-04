import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getModalTaskData, initStartModalState } from './taskModalHelpers';
import { changeDateFormat } from '../../../scripts/helpers';
import { MODAL_TITLES } from '../../../scripts/libraries';
import { TaskModal } from './taskModal/TaskModal';

export class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initStartModalState();
  }

  componentDidMount() {
    const { users, task } = this.props;
    this.setState((prevState) => {
      const usersTask = users.map((user) => ({
        id: user.id,
        value: task.users.some((item) => item.userId === user.id),
        name: user.name,
      }));
      const startDate = changeDateFormat(task.startDate);
      const deadline = changeDateFormat(task.deadline);

      return {
        ...prevState,
        title: task.title,
        description: task.description,
        startDate,
        deadline,
        usersTask,
      };
    });
  }

  onChangeInputValue = (name, value) => {
    this.setState({ [name]: value });
  };

  updateTask = () => {
    const { updateTask } = this.props;
    const task = getModalTaskData(this.state);
    updateTask(task);
  };

  changeUserValue = (userId, value) => {
    const { usersTask } = this.state;
    const updatedUsersTask = usersTask.map((user) => (user.id === userId ? { ...user, value } : user));
    this.setState((prevState) => ({ ...prevState, usersTask: updatedUsersTask }));
  };

  render() {
    const { disableModalMode } = this.props;
    const { usersTask, title, description, startDate, deadline } = this.state;

    return (
      <TaskModal
        users={usersTask}
        closeModal={disableModalMode}
        modalTitle={MODAL_TITLES.edit}
        title={title}
        startDate={startDate}
        deadline={deadline}
        onChangeInput={this.onChangeInputValue}
        description={description}
        changeCheckboxValue={this.changeUserValue}
        submitTask={this.updateTask}
      />
    );
  }
}

EditTaskModal.propTypes = {
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
  disableModalMode: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
