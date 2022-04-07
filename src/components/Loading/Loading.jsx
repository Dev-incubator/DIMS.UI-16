import { ClockLoader } from 'react-spinners';
import styles from './Loading.module.css';

export function Loading() {
  return (
    <div className={styles.loading}>
      <ClockLoader loading size={100} />
    </div>
  );
}
