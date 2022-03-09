import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  getCreateModalState,
  getEditModalState,
  getModalTaskData,
  getReadModalState,
  getTaskModalErrors,
  initStartModalState,
} from '../taskModalHelpers';
import { deepEqual } from '../../../../scripts/helpers';
import { BUTTON_COLORS, TASK_MODAL_TITLES } from '../../../../scripts/libraries';
import { Modal } from '../../../../components/Modal/Modal';
import styles from './TaskModal.module.css';
import { TaskModalFields } from '../taskForm/TaskModalFields';
import { TaskModalUsersList } from '../taskForm/TaskModalUsersList';
import { FormSubmit } from '../../form/formSubmit/FormSubmit';

export class TaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initStartModalState;
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (!deepEqual(prevProps, this.props) && active) {
      const { task, readOnly } = this.props;
      if (readOnly && task) {
        this.setReadData();
      } else if (task) {
        this.setEditData();
      } else {
        this.setCreateData();
      }
    }
  }

  setReadData = () => {
    const { users, task } = this.props;
    const data = getReadModalState(task, users);
    this.setState(data);
  };

  setEditData = () => {
    const { users, task } = this.props;
    const data = getEditModalState(task, users);
    this.setState(data);
  };

  setCreateData = () => {
    const { users } = this.props;
    const data = getCreateModalState(users);
    this.setState(data);
  };

  changeUserValue = (userId, value) => {
    const { usersTask } = this.state;
    this.resetFieldError('users');
    const updatedUsersTask = usersTask.map((user) => (user.id === userId ? { ...user, value } : user));
    this.setState((prevState) => ({ ...prevState, usersTask: updatedUsersTask }));
  };

  onChangeInputValue = (name, value) => {
    this.resetFieldError(name);
    this.setState({ [name]: value });
  };

  submitTask = () => {
    const { task, addTask } = this.props;
    const formErrors = getTaskModalErrors(this.state);

    if (formErrors) {
      this.setState({ formErrors });
    } else {
      const { updateTask } = this.props;
      const submitTask = getModalTaskData(this.state);
      if (task) {
        updateTask(submitTask);
      } else {
        addTask(submitTask);
      }
    }
  };

  resetFieldError = (name) => {
    this.setState((prevState) => ({ ...prevState, formErrors: { ...prevState.formErrors, [name]: '' } }));
  };

  render() {
    const { disableModalMode, active } = this.props;
    const { usersTask, title, description, startDate, deadline, formErrors, readOnly, modalTitle } = this.state;

    return (
      <Modal disableModalMode={disableModalMode} active={active}>
        <div className={styles.title}>{modalTitle}</div>
        <form className={styles.form}>
          <TaskModalFields
            title={title}
            startDate={startDate}
            onChangeInputValue={this.onChangeInputValue}
            description={description}
            deadline={deadline}
            readOnly={readOnly}
            formErrors={formErrors}
          />
          <TaskModalUsersList
            usersTask={usersTask}
            changeUserValue={this.changeUserValue}
            error={formErrors.users}
            readOnly={readOnly}
          />
          <FormSubmit
            onSubmit={this.submitTask}
            readOnly={readOnly}
            disableModalMode={disableModalMode}
            submitButtonColor={modalTitle === TASK_MODAL_TITLES.edit ? BUTTON_COLORS.green : BUTTON_COLORS.blue}
          />
        </form>
      </Modal>
    );
  }
}

TaskModal.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
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
  }),
  disableModalMode: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
TaskModal.defaultProps = {
  task: null,
};
