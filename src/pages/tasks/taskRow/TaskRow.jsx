import PropTypes from 'prop-types';
import styles from '../Tasks.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';

export function TaskRow({
  number,
  title,
  description,
  startDate,
  deadline,
  openEditModal,
  openReadModal,
  openDeleteModal,
}) {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <button type='button' className={styles.taskTitle} onClick={openReadModal}>
          {title}
        </button>
      </td>
      <td>{description}</td>
      <td>{startDate}</td>
      <td>{deadline}</td>
      <td>
        <div className={styles.buttonGroup}>
          <Button color={BUTTON_COLORS.orange} onClick={openEditModal}>
            {BUTTON_VALUES.edit}
          </Button>
          <Button color={BUTTON_COLORS.red} onClick={openDeleteModal}>
            {BUTTON_VALUES.delete}
          </Button>
        </div>
      </td>
    </tr>
  );
}

TaskRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openReadModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};
