import { getCreateTaskState } from '../helpers';

describe('Create task modal tests', () => {
  const result = {
    assignedUsers: [
      { id: 1, name: 'Ryan', surname: 'Gosling', value: false },
      { id: 2, name: 'Cristiano', surname: 'Ronaldo', value: false },
      { id: 3, name: 'React', surname: 'Reduxov', value: false },
    ],
    deadlineDate: '',
    description: '',
    name: '',
    startDate: '',
  };
  it('Should return data to create task', () => {
    const users = [
      { id: 1, firstName: 'Ryan', lastName: 'Gosling' },
      {
        id: 2,
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
      },
      { id: 3, firstName: 'React', lastName: 'Reduxov' },
    ];
    const actual = getCreateTaskState(users);
    expect(actual).toEqual(result);
  });
  it('Should return wrong data to create', () => {
    const users = [
      { id: 1, firstName: 'Ryan', lastName: 'Gosling' },
      {
        id: 2,
        firstName: 'Lionel',
        lastName: 'Messi',
      },
    ];
    const actual = getCreateTaskState(users);
    expect(actual).not.toEqual(result);
  });
});
