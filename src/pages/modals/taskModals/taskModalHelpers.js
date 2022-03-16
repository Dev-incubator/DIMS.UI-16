import { changeDateFormat, isObjectFieldsEmpty } from '../../../scripts/helpers';
import { TASK_MODAL_TITLES } from '../../../scripts/libraries';

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

export const initStartModalState = {
  title: '',
  description: '',
  startDate: '',
  deadline: '',
  usersTask: [],
  readOnly: false,
  formErrors: {
    title: '',
    startDate: '',
    deadline: '',
    description: '',
    users: '',
  },
};

export const getTaskModalErrors = (state) => {
  const { title, startDate, deadline, usersTask } = state;
  const formErrors = {
    title: '',
    startDate: '',
    deadline: '',
    users: '',
  };
  if (!title.trim()) {
    formErrors.title = 'Title is required';
  }
  if (!startDate.trim()) {
    formErrors.startDate = 'Start date is required';
  }
  if (!deadline.trim()) {
    formErrors.deadline = 'Deadline is required';
  }
  if (!usersTask.filter((user) => user.value).length) {
    formErrors.users = 'At least one member must be assigned';
  }

  if (!isObjectFieldsEmpty(formErrors)) {
    return formErrors;
  }

  return false;
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
    ...initStartModalState,
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
    ...initStartModalState,
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
    ...initStartModalState,
    modalTitle: TASK_MODAL_TITLES.create,
    usersTask,
  };
};
