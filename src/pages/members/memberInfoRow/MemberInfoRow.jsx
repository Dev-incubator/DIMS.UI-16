import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ListTask, Pencil, Trash, Wallet } from 'react-bootstrap-icons';
import styles from './MemberInfoRow.module.css';
import Button from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES, USER_ROLES } from '../../../constants/libraries';
import { getFullName } from '../../../scripts/helpers';
import { ThemeContext } from '../../../providers/ThemeProvider';
import { AuthContext } from '../../../providers/AuthProvider';

export function MemberInfoRow({
  id,
  number,
  name,
  surname,
  direction,
  education,
  startDate,
  age,
  isAdaptive,
  openDeleteModal,
  openEditModal,
  openReadModal,
}) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <AuthContext.Consumer>
          {({ user: { role } }) => (
            <tr>
              <td>{number}</td>
              <td>
                <button type='button' className={`${styles.userName} ${styles[theme]}`} onClick={openReadModal}>
                  {getFullName(name, surname)}
                </button>
              </td>
              <td>{direction}</td>
              <td>{education}</td>
              <td>{startDate}</td>
              <td>{age}</td>
              <td>
                <div className={styles.buttonGroup}>
                  <div className={styles.buttonsRow}>
                    {isAdaptive ? (
                      <>
                        <NavLink to={`/user-tasks/${id}`}>
                          <button type='button' className={styles.iconButton} onClick={openEditModal}>
                            <ListTask color={theme === 'dark' && 'var(--secondary)'} />
                          </button>
                        </NavLink>
                        <NavLink to={`/progress/${id}`}>
                          <button type='button' className={styles.iconButton} onClick={openDeleteModal}>
                            <Wallet color={theme === 'dark' && 'var(--secondary)'} />
                          </button>
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to={`/user-tasks/${id}`}>
                          <Button color={BUTTON_COLORS.green}>{BUTTON_VALUES.tasks}</Button>
                        </NavLink>
                        <NavLink to={`/progress/${id}`}>
                          <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.progress}</Button>
                        </NavLink>
                      </>
                    )}
                  </div>
                  {role === USER_ROLES.admin && (
                    <div className={styles.buttonsRow}>
                      {isAdaptive ? (
                        <>
                          <button type='button' className={styles.iconButton} onClick={openEditModal}>
                            <Pencil color={theme === 'dark' && 'var(--secondary)'} />
                          </button>
                          <button type='button' className={styles.iconButton} onClick={openDeleteModal}>
                            <Trash color={theme === 'dark' && 'var(--secondary)'} />
                          </button>
                        </>
                      ) : (
                        <>
                          <Button color={BUTTON_COLORS.orange} onClick={openEditModal}>
                            {BUTTON_VALUES.edit}
                          </Button>
                          <Button color={BUTTON_COLORS.red} onClick={openDeleteModal}>
                            {BUTTON_VALUES.delete}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          )}
        </AuthContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

MemberInfoRow.propTypes = {
  isAdaptive: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  education: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openReadModal: PropTypes.func.isRequired,
};
MemberInfoRow.defaultProps = {
  education: 'None',
};
