import { DISABLE_TASKS_LOADER, ENABLE_TASKS_LOADER } from '../type-constants';

const initialState = false;

export const tasksLoaderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ENABLE_TASKS_LOADER: {
      return true;
    }
    case DISABLE_TASKS_LOADER: {
      return false;
    }
    default: {
      return state;
    }
  }
};
