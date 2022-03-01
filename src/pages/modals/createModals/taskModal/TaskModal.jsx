import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import modalStyles from '../../Modals.module.css';
import styles from './TaskModal.module.css';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { BUTTON_COLORS, BUTTON_VALUES, MODAL_MODES, MODAL_TITLES, MODAL_VALUES } from '../../../../scripts/libraries';
import { FormField, INPUT_TYPES } from '../../form/formField/FormField';
import { Button } from '../../../../components/Buttons/Button/Button';
import { BackButton } from '../../../../components/Buttons/backButton/BackButton';
import { changeDateFormat } from '../../../../scripts/helpers';

export class TaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: '',
      deadline: '',
      usersTask: [],
    };
  }

  componentDidMount() {
    const { users, mode, task } = this.props;
    if (mode !== MODAL_MODES.create && task) {
      this.setState((prevState) => {
        return {
          ...prevState,
          title: task.title,
          description: task.description,
          startDate: changeDateFormat(task.startDate),
          deadline: changeDateFormat(task.deadline),
          usersTask: users.map((user) => ({
            id: user.id,
            value: task.users.some((item) => item.userId === user.id),
            name: user.name,
          })),
        };
      });
    } else {
      const usersTask = users.map((user) => ({ id: user.id, value: false, name: user.name }));
      this.setState({ usersTask });
    }
  }

  changeUserValue = (userId, value) => {
    const { usersTask } = this.state;
    const updatedUsersTask = usersTask.map((user) => (user.id === userId ? { ...user, value } : user));
    this.setState((prevState) => ({ ...prevState, usersTask: updatedUsersTask }));
  };

  onChangeTitleValue = (value) => {
    this.setState({ title: value });
  };

  onChangeDescriptionValue = (value) => {
    this.setState({ description: value });
  };

  onChangeStartDateValue = (value) => {
    this.setState({ startDate: value });
  };

  onChangeDeadlineValue = (value) => {
    this.setState({ deadline: value });
  };

  render() {
    const { usersTask, title, description, startDate, deadline } = this.state;
    const { mode, disableModalMode } = this.props;
    const readOnly = mode === MODAL_MODES.read;

    return (
      <div className={modalStyles.popup}>
        <div className={`${modalStyles.popupContent} ${styles.content}`}>
          <div className={modalStyles.title}>{MODAL_TITLES[mode]}</div>
          <form className={styles.form}>
            <FormField
              onChange={this.onChangeTitleValue}
              placeholder={MODAL_VALUES.name}
              value={title}
              readOnly={readOnly}
              required
              fieldName={MODAL_VALUES.name}
              type={INPUT_TYPES.text}
            />
            <FormField
              fieldName={MODAL_VALUES.description}
              onChange={this.onChangeDescriptionValue}
              readOnly={readOnly}
              placeholder={MODAL_VALUES.description}
              value={description}
              type={INPUT_TYPES.text}
            />
            <FormField
              fieldName={MODAL_VALUES.startDate}
              onChange={this.onChangeStartDateValue}
              readOnly={readOnly}
              required
              placeholder={MODAL_VALUES.startDate}
              value={startDate}
              type={INPUT_TYPES.date}
            />
            <FormField
              fieldName={MODAL_VALUES.deadline}
              onChange={this.onChangeDeadlineValue}
              readOnly={readOnly}
              required
              placeholder={MODAL_VALUES.deadline}
              value={deadline}
              type={INPUT_TYPES.date}
            />
            <div className={styles.usersList}>
              <div className={styles.fieldName}>Members</div>
              <div className={styles.layer}>
                {mode === MODAL_MODES.read
                  ? usersTask.map((user) => (
                      <div key={user.id} className={styles.user}>
                        {user.name}
                      </div>
                    ))
                  : usersTask.map((user) => {
                      const onChangeHandler = (event) => {
                        this.changeUserValue(user.id, event.currentTarget.checked);
                      };

                      return (
                        <Checkbox
                          key={user.id}
                          value={user.value}
                          onChange={onChangeHandler}
                          text={user.name}
                          id={user.id}
                        />
                      );
                    })}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              {mode !== MODAL_MODES.read ? (
                <Button color={BUTTON_COLORS.green} type='submit'>
                  {BUTTON_VALUES.save}
                </Button>
              ) : null}
              <BackButton onClick={disableModalMode}>{BUTTON_VALUES.backToList}</BackButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

TaskModal.propTypes = {
  mode: PropTypes.oneOf(['edit', 'read', 'create']).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  disableModalMode: PropTypes.func.isRequired,
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
};

TaskModal.defaultProps = {
  task: null,
};
