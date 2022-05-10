export const initTaskState = {
  name: '',
  description: '',
  deadlineDate: '',
  startDate: '',
  assignedUsers: [],
};

export const getUpdateTaskState = (task, users) => {
  const assignedUsers = users.map((item) => ({
    id: item.id,
    name: item.firstName,
    surname: item.lastName,
    value: task.assignedUsers.some((el) => el === item.id),
  }));

  return { ...initTaskState, ...task, assignedUsers };
};

export const getCreateTaskState = (users) => {
  const assignedUsers = users.map((item) => ({
    id: item.id,
    name: item.firstName,
    surname: item.lastName,
    value: false,
  }));

  return { ...initTaskState, assignedUsers };
};

export const toInitialFormObject = (array) => {
  const resultObject = {};
  array.forEach((item) => {
    resultObject[item] = '';
  });

  return resultObject;
};
