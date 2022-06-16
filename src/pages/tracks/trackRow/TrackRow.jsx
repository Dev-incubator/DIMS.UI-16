import PropTypes from 'prop-types';
import { InfoCircle, Pencil, Trash } from 'react-bootstrap-icons';
import { useContext } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Button from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';
import styles from './TrackRow.module.css';
import { ThemeContext } from '../../../providers/ThemeProvider';
import { iconColors } from '../../tasks/taskRow/TaskRow';

export function TrackRow({ number, title, note, date, openDeleteModal, openEditModal, isAdaptive, isXS }) {
  const themeContext = useContext(ThemeContext);

  const popover = (
    <Popover id='popover-basic' className={styles.popover}>
      <Popover.Header as='h3'>Additional info</Popover.Header>
      <Popover.Body>
        <div>Task note: {note}</div>
        <div>Date: {date}</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <tr>
      <td>{number}</td>
      <td>
        {(isXS || isAdaptive) && (
          <OverlayTrigger trigger={['click', 'hover']} placement='right' overlay={popover}>
            <InfoCircle className={styles.icon} />
          </OverlayTrigger>
        )}
        <span>{title}</span>
      </td>
      <td>{note}</td>
      <td>{date}</td>
      <td>
        <div className={styles.buttonGroup}>
          {isAdaptive ? (
            <>
              <button type='button' className={styles.iconButton} onClick={openEditModal}>
                <Pencil color={iconColors[themeContext.theme]} />
              </button>
              <button type='button' className={styles.iconButton} onClick={openDeleteModal}>
                <Trash color={iconColors[themeContext.theme]} />
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
      </td>
    </tr>
  );
}

TrackRow.propTypes = {
  isXS: PropTypes.bool.isRequired,
  isAdaptive: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};
