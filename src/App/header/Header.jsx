import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <NavLink to='/users' activeClassName={styles.active}>
        Members
      </NavLink>
      <NavLink to='/tasks' activeClassName={styles.active}>
        Tasks
      </NavLink>
      <NavLink to='/login' activeClassName={styles.active}>
        Log In
      </NavLink>
    </header>
  );
}
