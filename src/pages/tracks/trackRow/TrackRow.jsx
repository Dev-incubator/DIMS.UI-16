import PropTypes from 'prop-types';
import Button from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';
import styles from './TrackRow.module.css';

export function TrackRow({ number, title, note, date, openDeleteModal, openEditModal }) {
  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
      <td>{note}</td>
      <td>{date}</td>
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

TrackRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};
