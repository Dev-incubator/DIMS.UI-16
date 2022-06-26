import PropTypes from 'prop-types';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useContext } from 'react';
import styles from '../Tasks.module.css';
import Button from '../../../components/Buttons/Button/Button';
import { ThemeContext } from '../../../providers/ThemeProvider';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';

export const iconColors = {
  dark: 'var(--secondary)',
  light: 'var(--borderDark)',
};

export function TaskRow({
  number,
  title,
  description,
  startDate,
  deadline,
  openEditModal,
  openReadModal,
  openDeleteModal,
  isAdaptive,
}) {
  const themeContext = useContext(ThemeContext);

  return (
    <tr>
      <td>{number}</td>
      <td>
        <button type='button' className={`${styles.taskTitle} ${styles[themeContext.theme]}`} onClick={openReadModal}>
          {title}
        </button>
      </td>
      <td>{description}</td>
      <td>{startDate}</td>
      <td>{deadline}</td>
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

TaskRow.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openReadModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  isAdaptive: PropTypes.bool.isRequired,
};
