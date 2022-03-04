import { changeDateFormat } from '../../../scripts/helpers';

export const getModalTaskData = (state) => {
  const { title, description, startDate, deadline, usersTask } = state;
  const users = usersTask.filter((user) => user.value).map((user) => ({ userId: user.id, status: 'Active' }));

  return {
    title,
    description,
    startDate: changeDateFormat(startDate),
    deadline: changeDateFormat(deadline),
    users,
  };
};

export const initStartModalState = () => ({
  title: '',
  description: '',
  startDate: '',
  deadline: '',
  usersTask: [],
});
