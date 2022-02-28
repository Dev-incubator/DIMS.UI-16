import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import modalStyles from '../../Modals.module.css';
import styles from './TaskModal.module.css';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { MODAL_TITLES, MODAL_VALUES } from '../../../../scripts/libraries';
import { FormField } from '../../form/formField/FormField';

export class TaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: null,
      deadline: null,
      usersTask: [],
    };
  }

  componentDidMount() {
    const { users } = this.props;
    const usersTask = users.map((user) => ({ id: user.id, value: false, name: user.name }));
    this.setState({ usersTask });
  }

  componentDidUpdate() {
    const { usersTask } = this.state;
    const { mode } = this.props;
    console.log(usersTask);
    console.log(mode);
  }

  changeUserValue = (userId, value) => {
    const { usersTask } = this.state;
    const updatedUsersTask = usersTask.map((user) => (user.id === userId ? { ...user, value } : user));
    console.log(updatedUsersTask);
    this.setState((prevState) => ({ ...prevState, usersTask: updatedUsersTask }));
  };

  onChangeTitleInput = (value) => {
    this.setState({ title: value });
  };

  onChangeDescriptionInput = (value) => {
    this.setState({ description: value });
  };

  render() {
    const { usersTask, title, description } = this.state;
    const { mode } = this.props;

    return (
      <div className={modalStyles.popup}>
        <div className={`${modalStyles.popupContent} ${styles.content}`}>
          <div className={modalStyles.title}>{MODAL_TITLES[mode]}</div>
          <div className={styles.form}>
            <FormField
              onChange={this.onChangeTitleInput}
              placeholder={MODAL_VALUES.name}
              value={title}
              fieldName={MODAL_VALUES.name}
            />
            <FormField
              fieldName={MODAL_VALUES.description}
              onChange={this.onChangeDescriptionInput}
              placeholder={MODAL_VALUES.description}
              value={description}
            />

            {mode === 'read'
              ? usersTask.map((user) => <div className={styles.user}>{user.name}</div>)
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
};
