import { disableErrorAC, disableLoaderAC, enableLoaderAC, setErrorAC } from '../fetchReducer/fetchReducer';
import { addTask, deleteTask, deleteTrack, getAllTasks, updateTask } from '../../scripts/api-service';
import { addTaskAC, getTasksAC, removeTaskAC, updateTaskAC } from '../tasksReducer/tasksReducer';

export const getTasksThunk = () => {
  return async (dispatch) => {
    dispatch(enableLoaderAC());
    const tasks = await getAllTasks();
    dispatch(getTasksAC(tasks));
    dispatch(disableLoaderAC());
  };
};

export const updateTaskThunk = (id, updatedTask) => {
  return async (dispatch, getState) => {
    dispatch(enableLoaderAC());
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

      dispatch(updateTaskAC(id, { ...updatedTask, users: updatedUsers }));
    } catch (error) {
      dispatch(setErrorAC(error.message));
      setTimeout(() => {
        dispatch(disableErrorAC());
      }, 3500);
    }
    dispatch(disableLoaderAC());
  };
};

export const addTaskThunk = (task) => {
  return (dispatch) => {
    dispatch(enableLoaderAC());
    addTask(task).then((doc) => dispatch(addTaskAC(doc.id, task)));
    dispatch(disableLoaderAC());
  };
};

export const removeTaskThunk = (id) => {
  return async (dispatch) => {
    dispatch(enableLoaderAC());
    await deleteTask(id);
    dispatch(removeTaskAC(id));
    dispatch(disableLoaderAC());
  };
};
