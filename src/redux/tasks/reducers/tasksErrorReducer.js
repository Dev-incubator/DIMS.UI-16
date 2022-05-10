import { DISABLE_TASKS_ERROR, SET_TASKS_ERROR } from '../type-constants';

const initialState = '';

export const tasksErrorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TASKS_ERROR: {
      return action.payload.message;
    }
    case DISABLE_TASKS_ERROR: {
      return '';
    }
    default: {
      return state;
    }
  }
};
