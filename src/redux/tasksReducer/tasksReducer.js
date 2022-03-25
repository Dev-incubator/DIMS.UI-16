import { ADD_TASK, GET_TASKS, REMOVE_TASK, UPDATE_TASK } from './type-constants';

const initialState = [];

// eslint-disable-next-line default-param-last
export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return action.payload.tasks;
    }
    case UPDATE_TASK: {
      return state.map((task) => (task.id === action.payload.id ? { ...task, ...action.payload.task } : task));
    }
    case ADD_TASK: {
      return [...state, { id: action.payload.id, ...action.payload.task }];
    }
    case REMOVE_TASK: {
      return state.filter((task) => task.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

export const getTasksAC = (tasks) => ({ type: GET_TASKS, payload: { tasks } });
export const updateTaskAC = (id, task) => ({ type: UPDATE_TASK, payload: { id, task } });
export const addTaskAC = (id, task) => ({ type: ADD_TASK, payload: { id, task } });
export const removeTaskAC = (id) => ({ type: REMOVE_TASK, payload: { id } });
