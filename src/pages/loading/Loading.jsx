import { ClockLoader } from 'react-spinners';
import styles from './Loading.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

const colors = {
  dark: 'var(--blue)',
  light: 'var(--darkBlue)',
};

export function Loading() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={styles.loading}>
          <ClockLoader color={colors[theme]} loading size={100} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
