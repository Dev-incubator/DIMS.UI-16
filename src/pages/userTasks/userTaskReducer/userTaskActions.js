import { SET_TASKS, UPDATE_STATUS } from './type-constants';

export const setTasksAction = (tasks) => ({ type: SET_TASKS, payload: { tasks } });
export const updateTaskStatusAction = (id, value) => ({ type: UPDATE_STATUS, payload: { id, value } });
