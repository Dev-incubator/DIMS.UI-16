export function changeDateFormat(date) {
  return date.split('.').reverse().join('-');
}

export function getUsersTask(users, task) {
  return users.map((user) => ({
    id: user.id,
    value: task.users.some((item) => item.userId === user.id),
    name: user.name,
  }));
}
