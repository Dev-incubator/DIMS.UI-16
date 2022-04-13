import { changeDateFormat, isObjectFieldsEmpty } from '../../../scripts/helpers';
import { MODAL_VALUES, TASK_MODAL_TITLES } from '../../../constants/libraries';

export const getModalTaskData = (state) => {
  const { title, description, startDate, deadline, usersTask } = state;
  const users = usersTask.filter((user) => user.value).map((user) => ({ userId: user.id, status: 'Active' }));

  return {
    title: title.trim(),
    description: description.trim(),
    startDate: changeDateFormat(startDate),
    deadline: changeDateFormat(deadline),
    users,
  };
};

export const taskModalState = {
  title: '',
  description: '',
  startDate: '',
  deadline: '',
  usersTask: [],
  readOnly: false,
  errors: {
    title: '',
    startDate: '',
    deadline: '',
    description: '',
    users: '',
  },
};

export const getTaskModalErrors = (state) => {
  const { usersTask } = state;
  const errors = {
    title: '',
    startDate: '',
    deadline: '',
  };

  const keys = Object.keys(errors);
  keys.forEach((key) => {
    if (!state[key].trim()) {
      errors[key] = `${MODAL_VALUES[key]} is required`;
    }
  });

  if (!usersTask.filter((user) => user.value).length) {
    errors.users = 'At least one member must be assigned';
  }

  if (!isObjectFieldsEmpty(errors)) {
    return errors;
  }

  return null;
};

export const getEditModalState = (task, users) => {
  const usersTask = users.map((user) => ({
    id: user.id,
    value: task.users.some((item) => item.userId === user.id),
    name: user.name,
    surname: user.surname,
  }));
  const startDate = changeDateFormat(task.startDate);
  const deadline = changeDateFormat(task.deadline);

  return {
    ...taskModalState,
    modalTitle: TASK_MODAL_TITLES.edit,
    title: task.title,
    description: task.description,
    startDate,
    deadline,
    usersTask,
  };
};

export const getReadModalState = (task, users) => {
  const usersTask = users.filter((user) => task.users.some((item) => item.userId === user.id));
  const startDate = changeDateFormat(task.startDate);
  const deadline = changeDateFormat(task.deadline);

  return {
    ...taskModalState,
    modalTitle: TASK_MODAL_TITLES.read,
    readOnly: true,
    title: task.title,
    description: task.description,
    startDate,
    deadline,
    usersTask,
  };
};

export const getCreateModalState = (users) => {
  const usersTask = users.map((user) => ({ id: user.id, name: user.name, surname: user.surname, value: false }));

  return {
    ...taskModalState,
    modalTitle: TASK_MODAL_TITLES.create,
    usersTask,
  };
};
