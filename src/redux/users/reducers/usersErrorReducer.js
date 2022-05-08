import { DISABLE_USERS_ERROR, SET_USERS_ERROR } from '../type-constants';

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
