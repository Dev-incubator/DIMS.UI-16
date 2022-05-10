import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getCurrentUserId, getToken, removeCurrentUserid, removeToken } from '../pages/api/storage';
import { logIn } from '../pages/api/api';

export const ApiAuthContext = createContext({
  token: null,
  userId: null,
  logIn: () => {},
  logOut: () => {},
});

const ApiAuthProvider = ({ children, history }) => {
  const [state, setState] = useState({
    context: {
      token: null,
      userId: null,
      logIn: logInHandler,
      logOut: logOutHandler,
    },
  });

  useEffect(() => {
    startAuth();
  }, []);

  async function logInHandler(email, password) {
    try {
      const { token, id } = await logIn(email, password);
      setState((prevState) => ({ ...prevState, context: { ...prevState.context, token, userId: id } }));
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
      setState((prevState) => ({ ...prevState, context: { ...prevState.context, token, userId } }));
    }
  }

  return <ApiAuthContext.Provider value={state.context}>{children}</ApiAuthContext.Provider>;
};

ApiAuthProvider.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(ApiAuthProvider);
