import { ADD_TASK, GET_TASKS, REMOVE_TASK, UPDATE_TASK } from '../type-constants';

const initialState = [];

export const tasksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TASKS: {
      return action.payload.tasks;
    }
    case UPDATE_TASK: {
      return state.map((task) => (task.id === action.payload.id ? { ...task, ...action.payload.task } : task));
    }
    case ADD_TASK: {
      const { task } = action.payload;

      return [...state, task];
    }
    case REMOVE_TASK: {
      return state.filter((task) => task.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};
