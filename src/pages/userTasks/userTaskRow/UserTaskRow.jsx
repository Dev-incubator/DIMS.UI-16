import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES, TASK_STATUS, USER_ROLES } from '../../../constants/libraries';
import styles from '../UserTasks.module.css';
import { ThemeContext } from '../../../providers/ThemeProvider';
import { getStatusColor } from '../userTasksHelper';
import { AuthContext } from '../../../providers/AuthProvider';

export const statusThemeColors = {
  light: {
    primary: 'var(--blue)',
    success: 'var(--green)',
    error: 'var(--red)',
  },
  dark: {
    primary: 'var(--darkBlue)',
    success: 'var(--darkGreen)',
    error: 'var(--darkRed)',
  },
};

export function UserTaskRow({ userId, number, title, startDate, status, deadline, taskId, updateTaskStatus }) {
  const buttonColor = status === TASK_STATUS.active ? BUTTON_COLORS.green : BUTTON_COLORS.blue;
  const buttonValue = status === TASK_STATUS.active ? BUTTON_VALUES.success : BUTTON_VALUES.active;
  const disabledFailButton = status === TASK_STATUS.fail;

  const updateTaskStatusHandler = ({ target: { name } }) => {
    updateTaskStatus(taskId, userId, name);
  };

  const statusColor = getStatusColor(status);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <AuthContext.Consumer>
          {({ user: { role } }) => (
            <tr>
              <td>{number}</td>
              <td>
                {role === USER_ROLES.user ? (
                  <NavLink to={`/track/${userId}/task/${taskId}`} className={`${styles.link} ${styles[theme]}`}>
                    {title}
                  </NavLink>
                ) : (
                  <span>{title}</span>
                )}
              </td>
              <td>{startDate}</td>
              <td>{deadline}</td>
              <td>
                <div style={{ color: statusThemeColors[theme][statusColor] }}>{status}</div>
              </td>
              {role !== USER_ROLES.user && (
                <td>
                  <div className={styles.buttonGroup}>
                    <Button color={buttonColor} onClick={updateTaskStatusHandler} name={buttonValue}>
                      {buttonValue}
                    </Button>
                    <Button
                      color={BUTTON_COLORS.red}
                      readOnly={disabledFailButton}
                      name={BUTTON_VALUES.fail}
                      onClick={updateTaskStatusHandler}
                    >
                      {BUTTON_VALUES.fail}
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          )}
        </AuthContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

UserTaskRow.propTypes = {
  taskId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
  deadline: PropTypes.string.isRequired,
  status: PropTypes.oneOf([TASK_STATUS.fail, TASK_STATUS.active, TASK_STATUS.success]).isRequired,
};
