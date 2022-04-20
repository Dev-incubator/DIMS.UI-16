import { DISABLE_USERS_ERROR, SET_USERS_ERROR } from './type-constants';

const initialState = '';

export const usersErrorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USERS_ERROR: {
      return action.payload.message;
    }
    case DISABLE_USERS_ERROR: {
      return '';
    }
    default: {
      return state;
    }
  }
};

export const setUsersErrorAction = (message) => ({ type: SET_USERS_ERROR, payload: { message } });
export const disableUsersErrorAction = () => ({ type: DISABLE_USERS_ERROR });
