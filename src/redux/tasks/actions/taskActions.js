import {
  ADD_TASK,
  DISABLE_TASKS_ERROR,
  DISABLE_TASKS_LOADER,
  ENABLE_TASKS_LOADER,
  GET_TASKS,
  REMOVE_TASK,
  SET_TASKS_ERROR,
  UPDATE_TASK,
} from '../type-constants';

export const setTasksErrorAction = (message) => ({ type: SET_TASKS_ERROR, payload: { message } });
export const disableTasksErrorAction = () => ({ type: DISABLE_TASKS_ERROR });
export const enableTasksLoaderAction = () => ({ type: ENABLE_TASKS_LOADER });
export const disableTasksLoaderAction = () => ({ type: DISABLE_TASKS_LOADER });
export const getTasksAction = (tasks) => ({ type: GET_TASKS, payload: { tasks } });
export const updateTaskAction = (id, task) => ({ type: UPDATE_TASK, payload: { id, task } });
export const addTaskAction = (id, task) => ({ type: ADD_TASK, payload: { task: { ...task, id } } });
export const removeTaskAction = (id) => ({ type: REMOVE_TASK, payload: { id } });
