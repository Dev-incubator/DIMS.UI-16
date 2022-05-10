import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import styles from './Header.module.css';
import { getUserName } from '../../scripts/helpers';
import { withAuthContext } from '../../HOCs/withAuthContext';
import { HEADER_VALUES, USER_ROLES } from '../../constants/libraries';
import { ThemeContext } from '../../providers/ThemeProvider';
import { ApiAuthContext } from '../../providers/ApiAuthProvider';

function Header({ context }) {
  const apiAuthContext = useContext(ApiAuthContext);
  const { logOut, user } = context;
  const userName = getUserName(user);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Navbar collapseOnSelect expand='lg' variant='dark' className={`${styles.header} ${styles[theme]}`}>
          <Container className={styles.container}>
            <Navbar.Brand>DIMS</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className={`${styles.links} me-auto`}>
                {user && (
                  <div className={styles.links}>
                    {user.role === USER_ROLES.admin || user.role === USER_ROLES.mentor ? (
                      <>
                        <NavLink to='/users' activeClassName={styles.active}>
                          {HEADER_VALUES.members}
                        </NavLink>
                        <NavLink to='/tasks' activeClassName={styles.active}>
                          {HEADER_VALUES.tasks}
                        </NavLink>
                        <NavLink to={`/settings/${user.id}`} activeClassName={styles.active}>
                          {HEADER_VALUES.settings}
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to={`/user-tasks/${user.id}`} activeClassName={styles.active}>
                          {HEADER_VALUES.tasks}
                        </NavLink>
                        <NavLink to={`/settings/${user.id}`} activeClassName={styles.active}>
                          {HEADER_VALUES.settings}
                        </NavLink>
                      </>
                    )}
                  </div>
                )}
                <NavLink to='/about' activeClassName={styles.active}>
                  About
                </NavLink>
                {apiAuthContext.token && (
                  <NavLink to='/api' activeClassName={styles.active}>
                    Swagger
                  </NavLink>
                )}
              </Nav>
              <Nav>
                {user || apiAuthContext.token ? (
                  <div className={styles.auth}>
                    <Navbar.Text>{userName}</Navbar.Text>
                    <NavLink
                      to='/login'
                      onClick={apiAuthContext.token ? apiAuthContext.logOut : logOut}
                      activeClassName={styles.active}
                    >
                      Log out
                    </NavLink>
                  </div>
                ) : (
                  <NavLink to='/login' className={styles.logIn} activeClassName={styles.active}>
                    Log In
                  </NavLink>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </ThemeContext.Consumer>
  );
}

Header.propTypes = {
  context: PropTypes.shape({
    logOut: PropTypes.func,
    user: PropTypes.shape({
      role: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
};

Header.defaultProps = {
  context: null,
};

export default withAuthContext(Header);
