import { getUpdateTaskState } from '../helpers';

describe('Update task modal tests', () => {
  const task = {
    name: 'Some title',
    assignedUsers: [1, 2],
  };
  const users = [
    { id: 1, firstName: 'Ryan', lastName: 'Gosling' },
    {
      id: 2,
      firstName: 'Cristiano',
      lastName: 'Ronaldo',
    },
    { id: 3, firstName: 'React', lastName: 'Reduxov' },
  ];

  const result = {
    assignedUsers: [
      { id: 1, name: 'Ryan', surname: 'Gosling', value: true },
      { id: 2, name: 'Cristiano', surname: 'Ronaldo', value: true },
      { id: 3, name: 'React', surname: 'Reduxov', value: false },
    ],
    deadlineDate: '',
    description: '',
    name: 'Some title',
    startDate: '',
  };

  it('Should return data to update in task modal', () => {
    const actual = getUpdateTaskState(task, users);
    expect(actual).toEqual(result);
  });
  it('Should return wrong data to modal', () => {
    const actual = getUpdateTaskState({ ...task, name: 'Other name' }, users);
    expect(actual).not.toEqual(result);
  });
});
