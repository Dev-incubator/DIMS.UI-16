import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import { HEADER_VALUES, USER_ROLES } from '../../scripts/libraries';

export function Header({ user, logout }) {
  const userName = user && user.email ? user.email.split('@')[0] : '';

  return (
    <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark' className={styles.header}>
      <Container className={styles.container}>
        <Navbar.Brand>DIMS</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        {user ? (
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className={`${styles.links} me-auto`}>
              {user.role === USER_ROLES.admin || user.role === USER_ROLES.mentor ? (
                <div className={styles.links}>
                  <NavLink to='/users' activeClassName={styles.active}>
                    {HEADER_VALUES.members}
                  </NavLink>
                  <NavLink to='/tasks' activeClassName={styles.active}>
                    {HEADER_VALUES.tasks}
                  </NavLink>
                </div>
              ) : (
                <div className={styles.links}>
                  <NavLink to={`/tasks/${user.id}`} activeClassName={styles.active}>
                    {HEADER_VALUES.tasks}
                  </NavLink>
                </div>
              )}
              <NavLink to='/about' activeClassName={styles.active}>
                {HEADER_VALUES.about}
              </NavLink>
              <NavLink to={`/settings/${user.id}`} activeClassName={styles.active}>
                {HEADER_VALUES.settings}
              </NavLink>
            </Nav>
            <Nav className={styles.user}>
              <Navbar.Text>{userName}</Navbar.Text>
              <NavLink to='/login' onClick={logout} activeClassName={styles.active}>
                {HEADER_VALUES.logout}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className={`${styles.links} me-auto`}>
              <NavLink to='/about' activeClassName={styles.active}>
                {HEADER_VALUES.about}
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to='/login' activeClassName={styles.active}>
                {HEADER_VALUES.logIn}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({ email: PropTypes.string, role: PropTypes.string, id: PropTypes.string }),
};
Header.defaultProps = {
  user: null,
};
