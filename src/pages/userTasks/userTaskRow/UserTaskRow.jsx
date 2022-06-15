import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Dropdown, ButtonGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
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

export function UserTaskRow({
  userId,
  number,
  title,
  startDate,
  status,
  deadline,
  taskId,
  updateTaskStatus,
  isAdaptive,
}) {
  const buttonColor = status === TASK_STATUS.active ? BUTTON_COLORS.green : BUTTON_COLORS.blue;
  const buttonValue = status === TASK_STATUS.active ? BUTTON_VALUES.success : BUTTON_VALUES.active;
  const disabledFailButton = status === TASK_STATUS.fail;

  const updateTaskStatusHandler = ({ target: { name } }) => {
    updateTaskStatus(taskId, userId, name);
  };

  const statusColor = getStatusColor(status);

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Additional info</Popover.Header>
      <Popover.Body>
        <div>Start date: {startDate}</div>
        <div>Deadline date: {deadline}</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <AuthContext.Consumer>
          {({ user: { role } }) => (
            <tr>
              <td>{number}</td>
              <td>
                {isAdaptive && (
                  <OverlayTrigger trigger={['click', 'hover']} placement='right' overlay={popover}>
                    <InfoCircle className={styles.icon} />
                  </OverlayTrigger>
                )}
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
                {isAdaptive ? (
                  <div className={styles.circle} style={{ backgroundColor: statusThemeColors[theme][statusColor] }} />
                ) : (
                  <div style={{ color: statusThemeColors[theme][statusColor] }}>{status}</div>
                )}
              </td>
              {role !== USER_ROLES.user && (
                <td>
                  {isAdaptive ? (
                    <Dropdown as={ButtonGroup} className={styles.dropdown}>
                      <Dropdown.Toggle split variant='link' id='dropdown-split-basic' />
                      <Dropdown.Menu className={styles.menu}>
                        <Dropdown.Item>
                          <Button color={buttonColor} onClick={updateTaskStatusHandler} name={buttonValue}>
                            {buttonValue}
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Button
                            color={BUTTON_COLORS.red}
                            readOnly={disabledFailButton}
                            name={BUTTON_VALUES.fail}
                            onClick={updateTaskStatusHandler}
                          >
                            {BUTTON_VALUES.fail}
                          </Button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
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
                  )}
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
  isAdaptive: PropTypes.bool.isRequired,
  taskId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
  deadline: PropTypes.string.isRequired,
  status: PropTypes.oneOf([TASK_STATUS.fail, TASK_STATUS.active, TASK_STATUS.success]).isRequired,
};
