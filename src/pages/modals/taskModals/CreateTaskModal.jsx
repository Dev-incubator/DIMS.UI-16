import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MODAL_TITLES } from '../../../scripts/libraries';
import { getModalTaskData, initStartModalState } from './taskModalHelpers';
import { TaskModal } from './taskModal/TaskModal';

export class CreateTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initStartModalState();
  }

  componentDidMount() {
    const { users } = this.props;
    const usersTask = users.map((user) => ({ id: user.id, name: user.name, value: false }));
    this.setState({ usersTask });
  }

  onChangeInputValue = (name, value) => {
    this.setState({ [name]: value });
  };

  addTask = () => {
    const { addTask } = this.props;
    const task = getModalTaskData(this.state);
    addTask(task);
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
        title={title}
        description={description}
        startDate={startDate}
        deadline={deadline}
        closeModal={disableModalMode}
        modalTitle={MODAL_TITLES.create}
        changeCheckboxValue={this.changeUserValue}
        submitTask={this.addTask}
        onChangeInput={this.onChangeInputValue}
      />
    );
  }
}

CreateTaskModal.propTypes = {
  addTask: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  disableModalMode: PropTypes.func.isRequired,
};
