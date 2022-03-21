import PropTypes from 'prop-types';
import { Button } from '../../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../../scripts/libraries';
import styles from './TrackRow.module.css';

export function TrackRow({ id, number, title, note, date, enableDeleteMode }) {
  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
      <td>{note}</td>
      <td>{date}</td>
      <td>
        <div className={styles.buttonGroup}>
          <Button color={BUTTON_COLORS.orange}>{BUTTON_VALUES.edit}</Button>
          <Button color={BUTTON_COLORS.red} onClick={() => enableDeleteMode(id)}>
            {BUTTON_VALUES.delete}
          </Button>
        </div>
      </td>
    </tr>
  );
}

TrackRow.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  enableDeleteMode: PropTypes.func.isRequired,
};
