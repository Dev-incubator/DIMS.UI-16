import PropTypes from 'prop-types';
import styles from '../Tasks.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../scripts/libraries';

export function TaskRow({ number, title, description, startDate, deadline, setEditMode, setReadMode, id }) {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <button type='button' className={styles.taskTitle} onClick={() => setReadMode(id)}>
          {title}
        </button>
      </td>
      <td>{description}</td>
      <td>{startDate}</td>
      <td>{deadline}</td>
      <td>
        <div className={styles.buttonGroup}>
          <Button color={BUTTON_COLORS.orange} onClick={() => setEditMode(id)}>
            {BUTTON_VALUES.edit}
          </Button>
          <Button color={BUTTON_COLORS.red}>{BUTTON_VALUES.delete}</Button>
        </div>
      </td>
    </tr>
  );
}

TaskRow.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setReadMode: PropTypes.func.isRequired,
};
