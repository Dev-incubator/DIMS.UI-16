import { DISABLE_USERS_LOADER, ENABLE_USERS_LOADER } from '../type-constants';

const initialState = false;

export const usersLoaderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ENABLE_USERS_LOADER: {
      return true;
    }
    case DISABLE_USERS_LOADER: {
      return false;
    }
    default: {
      return state;
    }
  }
};
