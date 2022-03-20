import PropTypes from 'prop-types';
import styles from '../taskModal/TaskModal.module.css';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { ThemeContext } from '../../../../providers/ThemeProvider';

export function TaskModalUsersList({ usersTask, changeUserValue, error, readOnly }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={styles.usersList}>
          <div className={styles.fieldName}>Members</div>
          <div>
            <div className={styles.layer} style={{ borderColor: theme.borderColor }}>
              {readOnly
                ? usersTask.map((user) => (
                    <div key={user.id}>
                      {user.name} {user.surname}
                    </div>
                  ))
                : usersTask.map((user) => {
                    const onChangeHandler = (event) => {
                      changeUserValue(user.id, event.currentTarget.checked);
                    };

                    return (
                      <Checkbox
                        key={user.id}
                        value={user.value}
                        onChange={onChangeHandler}
                        text={`${user.name} ${user.surname}`}
                        id={user.id}
                      />
                    );
                  })}
            </div>
            {error && (
              <div className={styles.errorMessage} style={{ color: theme.error }}>
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
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
