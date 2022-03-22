import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './MemberInfoRow.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';

export function MemberInfoRow({ id, number, name, direction, education, startDate, age, enableDeleteMode }) {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <span>{name}</span>
      </td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>{startDate}</td>
      <td>{age}</td>
      <td>
        <div className={styles.buttonGroup}>
          <NavLink to={`/tasks/${id}`}>
            <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.tasks}</Button>
          </NavLink>
          <NavLink to={`/progress/${id}`}>
            <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.progress}</Button>
          </NavLink>
          <Button color={BUTTON_COLORS.orange}>{BUTTON_VALUES.edit}</Button>
          <Button color={BUTTON_COLORS.red} onClick={enableDeleteMode}>
            {BUTTON_VALUES.delete}
          </Button>
        </div>
      </td>
    </tr>
  );
}

MemberInfoRow.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  education: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  enableDeleteMode: PropTypes.func.isRequired,
};
MemberInfoRow.defaultProps = {
  education: 'None',
};
