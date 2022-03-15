import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const headerValues = ['Users', 'Tasks'];

export function Header() {
  return (
    <header className={styles.header}>
      {headerValues.map((item, index) => (
        <NavLink key={index.toString() + item} to={`/${item.toLowerCase()}`} activeClassName={styles.active}>
          {item}
        </NavLink>
      ))}
    </header>
  );
}
