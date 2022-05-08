import { SET_TASKS, UPDATE_STATUS } from './type-constants';

export const userTaskReducer = (state, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return action.payload.tasks;
    }
    case UPDATE_STATUS: {
      return state.map((task) => (task.id === action.payload.id ? { ...task, status: action.payload.value } : task));
    }
    default: {
      return state;
    }
  }
};
