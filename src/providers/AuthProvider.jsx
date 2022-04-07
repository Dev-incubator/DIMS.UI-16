import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { auth } from '../scripts/firebase-config';
import { getUserById, login } from '../scripts/api-service';

onAuthStateChanged(auth, (currentUser) => {
  localStorage.setItem('user', JSON.stringify(currentUser));
});

export const AuthContext = React.createContext({
  user: null,
  logOut: () => {},
  logIn: () => {},
});

class AuthProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userContext: {
        user: null,
        logIn: this.logIn,
        logOut: this.logOut,
      },
      isAuth: false,
    };
  }

  async componentDidMount() {
    await this.auth();
  }

  logOut = async () => {
    await signOut(auth);
    this.setState((prevState) => ({ userContext: { ...prevState.userContext, user: null } }));
  };

  logIn = async (email, password) => {
    const { history } = this.props;
    const error = await login(email, password);
    if (!error) {
      await this.auth();
      history.push('/about');
    }

    return error;
  };

  auth = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const currentUser = await getUserById(user.uid);
      this.setState((prevState) => ({ userContext: { ...prevState.userContext, user: currentUser } }));
    }
    this.setState({ isAuth: true });
  };

  render() {
    const { userContext, isAuth } = this.state;
    const { children } = this.props;
    if (!isAuth) {
      return null;
    }

    return <AuthContext.Provider value={userContext}>{children}</AuthContext.Provider>;
  }
}

AuthProvider.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(AuthProvider);
