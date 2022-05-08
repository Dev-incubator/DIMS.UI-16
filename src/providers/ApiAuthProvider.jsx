import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getCurrentUserId, getToken, removeCurrentUserid, removeToken } from '../pages/api/storage';
import { logIn } from '../pages/api/api';
import { Loading } from '../pages/loading/Loading';

export const ApiAuthContext = createContext({
  token: null,
  userId: null,
  logIn: () => {},
  logOut: () => {},
});

const ApiAuthProvider = ({ children, history }) => {
  useEffect(() => {
    startAuth();
  }, []);

  const [state, setState] = useState({
    context: {
      token: null,
      userId: null,
      logIn: logInHandler(),
      logOut: logOutHandler(),
    },
    isAuth: false,
  });

  async function logInHandler(email, password) {
    try {
      const { token, id } = await logIn(email, password);
      setState((prevState) => ({ ...prevState, context: { ...prevState.context, token, userId: id }, isAuth: true }));
      history.push('/api');

      return null;
    } catch (error) {
      return error;
    }
  }

  async function logOutHandler() {
    removeToken();
    removeCurrentUserid();
    setState((prevState) => ({ ...prevState, context: { ...prevState.context, userId: null, token: null } }));
  }

  function startAuth() {
    const token = getToken();
    const userId = getCurrentUserId();
    if (token && userId) {
      setState((prevState) => ({ ...prevState, context: { ...prevState.context, token, userId }, isAuth: true }));
    }
  }

  const { context, isAuth } = state;
  if (!isAuth) {
    return <Loading />;
  }

  return <ApiAuthContext.Provider value={context}>{children}</ApiAuthContext.Provider>;
};

ApiAuthProvider.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(ApiAuthProvider);
