import { addTask, deleteTask, deleteTrack, getAllTasks, updateTask } from '../../../scripts/api-service';
import {
  addTaskAction,
  getTasksAction,
  removeTaskAction,
  updateTaskAction,
  disableTasksLoaderAction,
  enableTasksLoaderAction,
  disableTasksErrorAction,
  setTasksErrorAction,
} from '../actions/taskActions';

export const getTasksThunk = () => {
  return async (dispatch) => {
    dispatch(enableTasksLoaderAction());
    const tasks = await getAllTasks();
    dispatch(getTasksAction(tasks));
    dispatch(disableTasksLoaderAction());
  };
};

export const updateTaskThunk = (id, updatedTask) => {
  return async (dispatch, getState) => {
    dispatch(enableTasksLoaderAction());
    try {
      const { tasks } = getState();
      const prevTask = tasks.find((task) => task.id === id);
      const { users } = updatedTask;
      const updatedUsers = users.map((user) => {
        const item = prevTask.users.find((el) => el.userId === user.userId);

        return item ? { ...user, status: item.status } : user;
      });
      await updateTask(id, { ...updatedTask, users: updatedUsers });

      prevTask.users.forEach(async (user) => {
        if (!users.some((item) => item.userId === user.userId)) {
          await deleteTrack(user.userId);
        }
      });

      dispatch(updateTaskAction(id, { ...updatedTask, users: updatedUsers }));
    } catch (error) {
      dispatch(setTasksErrorAction(error.message));
      setTimeout(() => {
        dispatch(disableTasksErrorAction());
      }, 3500);
    }
    dispatch(disableTasksLoaderAction());
  };
};

export const addTaskThunk = (task) => {
  return async (dispatch) => {
    dispatch(enableTasksLoaderAction());
    try {
      const doc = await addTask(task);
      dispatch(addTaskAction(doc.id, task));
    } catch (error) {
      dispatch(setTasksErrorAction(error.message));
      setTimeout(() => {
        dispatch(disableTasksErrorAction());
      }, 3500);
    }
    dispatch(disableTasksLoaderAction());
  };
};

export const removeTaskThunk = (id) => {
  return async (dispatch) => {
    dispatch(enableTasksLoaderAction());
    await deleteTask(id);
    dispatch(removeTaskAction(id));
    dispatch(disableTasksLoaderAction());
  };
};
