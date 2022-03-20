import { ClockLoader } from 'react-spinners';
import styles from './Loading.module.css';
import { ThemeContext } from '../../providers/ThemeProvider';

export function Loading() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={styles.loading}>
          <ClockLoader color={theme.primary} loading size={100} />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
