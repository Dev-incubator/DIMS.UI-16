import PropTypes from 'prop-types';
import styles from '../Tasks.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../scripts/libraries';
import { ThemeContext } from '../../../providers/ThemeProvider';

export function TaskRow({ number, title, description, startDate, deadline, setEditMode, setReadMode, setDeleteMode }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <tr>
          <td>{number}</td>
          <td>
            <button type='button' className={styles.taskTitle} onClick={setReadMode} style={{ color: theme.primary }}>
              {title}
            </button>
          </td>
          <td>{description}</td>
          <td>{startDate}</td>
          <td>{deadline}</td>
          <td>
            <div className={styles.buttonGroup}>
              <Button color={BUTTON_COLORS.orange} onClick={setEditMode}>
                {BUTTON_VALUES.edit}
              </Button>
              <Button color={BUTTON_COLORS.red} onClick={setDeleteMode}>
                {BUTTON_VALUES.delete}
              </Button>
            </div>
          </td>
        </tr>
      )}
    </ThemeContext.Consumer>
  );
}

TaskRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setReadMode: PropTypes.func.isRequired,
  setDeleteMode: PropTypes.func.isRequired,
};
