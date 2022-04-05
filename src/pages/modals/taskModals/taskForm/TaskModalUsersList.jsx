import PropTypes from 'prop-types';
import styles from '../taskModal/TaskModal.module.css';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';

export function TaskModalUsersList({ usersTask, changeUserValue, error, readOnly }) {
  return (
    <div className={styles.usersList}>
      <div className={styles.fieldName}>Members</div>
      <div>
        <div className={styles.layer}>
          {readOnly
            ? usersTask.map((user) => <div key={user.id}>{user.name}</div>)
            : usersTask.map((user) => {
                const onChangeHandler = (event) => {
                  changeUserValue(user.id, event.currentTarget.checked);
                };

                return (
                  <Checkbox key={user.id} value={user.value} onChange={onChangeHandler} text={user.name} id={user.id} />
                );
              })}
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}

TaskModalUsersList.propTypes = {
  error: PropTypes.string,
  changeUserValue: PropTypes.func.isRequired,
  usersTask: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.bool,
    }),
  ).isRequired,
  readOnly: PropTypes.bool,
};

TaskModalUsersList.defaultProps = {
  readOnly: false,
  error: '',
};
