import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { PureComponent } from 'react';
import styles from './Header.module.css';
import { getUserName } from '../../scripts/helpers';
import { withAuthContext } from '../../HOCs/withAuthContext';

class Header extends PureComponent {
  render() {
    const { context } = this.props;
    const { logOut, user } = context;
    const userName = getUserName(user);

    return (
      <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark' className={styles.header}>
        <Container className={styles.container}>
          <Navbar.Brand>DIMS</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className={`${styles.links} me-auto`}>
              {user && (
                <div className={styles.links}>
                  <NavLink to='/users' activeClassName={styles.active}>
                    Members
                  </NavLink>
                  <NavLink to='/tasks' activeClassName={styles.active}>
                    Tasks
                  </NavLink>
                </div>
              )}
              <NavLink to='/about' activeClassName={styles.active}>
                About
              </NavLink>
            </Nav>
            <Nav>
              {user ? (
                <div className={styles.auth}>
                  <Navbar.Text>{userName}</Navbar.Text>
                  <NavLink to='/login' onClick={logOut} activeClassName={styles.active}>
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
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }),
  context: PropTypes.shape({
    logOut: PropTypes.func,
    user: PropTypes.shape({}),
  }).isRequired,
};
Header.defaultProps = {
  user: null,
};

export default withAuthContext(Header);
