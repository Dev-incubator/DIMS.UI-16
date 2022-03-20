import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './MemberInfoRow.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES, USER_ROLES } from '../../../scripts/libraries';
import { ThemeContext } from '../../../providers/ThemeProvider';

export function MemberInfoRow({
  id,
  number,
  name,
  surname,
  direction,
  education,
  startDate,
  age,
  role,
  setDeleteMode,
  setEditMode,
  setReadMode,
}) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <tr>
          <td>{number}</td>
          <td>
            <button type='button' className={styles.userName} onClick={setReadMode} style={{ color: theme.primary }}>
              {name} {surname}
            </button>
          </td>
          <td>{direction}</td>
          <td>{education}</td>
          <td>{startDate}</td>
          <td>{age}</td>
          <td>
            <div className={styles.buttonGroup}>
              <NavLink to={`/tasks/${id}`}>
                <Button color={BUTTON_COLORS.green}>{BUTTON_VALUES.tasks}</Button>
              </NavLink>
              <NavLink to={`/progress/${id}`}>
                <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.progress}</Button>
              </NavLink>
              {role === USER_ROLES.admin && (
                <div className={styles.buttonGroup}>
                  <Button color={BUTTON_COLORS.orange} onClick={setEditMode}>
                    {BUTTON_VALUES.edit}
                  </Button>
                  <Button color={BUTTON_COLORS.red} onClick={setDeleteMode}>
                    {BUTTON_VALUES.delete}
                  </Button>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </ThemeContext.Consumer>
  );
}

MemberInfoRow.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  education: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setDeleteMode: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setReadMode: PropTypes.func.isRequired,
};
MemberInfoRow.defaultProps = {
  education: 'None',
};
