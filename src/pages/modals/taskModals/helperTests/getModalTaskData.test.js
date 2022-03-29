import { getModalTaskData } from '../taskModalHelpers';

describe('Task modal tests', () => {
  const result = {
    deadline: '17.03.2022',
    description: 'qwerty',
    startDate: '11.03.2022',
    title: '12345',
    users: [
      { userId: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', status: 'Active' },
      { userId: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', status: 'Active' },
    ],
  };

  it('Function returns data in task modal', () => {
    const state = {
      deadline: '2022-03-17',
      description: 'qwerty',
      startDate: '2022-03-11',
      title: '12345',
      usersTask: [
        { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor', value: true },
        { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima', value: true },
        { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx', value: false },
      ],
    };

    expect(getModalTaskData(state)).toEqual(result);
  });

  it('Function returns wrong data from task modal', () => {
    const state = {
      deadline: '2021-03-17',
      description: 'qwerty',
      startDate: '2022-03-11',
      title: '12345',
      usersTask: [
        { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor', value: true },
        { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima', value: true },
        { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx', value: false },
      ],
    };

    expect(getModalTaskData(state)).not.toEqual(result);
  });
});
