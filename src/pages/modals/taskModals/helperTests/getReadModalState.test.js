import { getReadModalState } from '../taskModalHelpers';

describe('Task modal tests', () => {
  const users = [
    { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor' },
    { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima' },
    { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx' },
  ];
  const result = {
    deadline: '2022-03-09',
    description: 'dasdasdt',
    formErrors: { deadline: '', description: '', startDate: '', title: '', users: '' },
    modalTitle: 'Task details',
    readOnly: true,
    startDate: '2022-03-10',
    title: 'dsa',
    usersTask: [
      { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor' },
      { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima' },
    ],
  };

  it('Should return data to read in task modal', () => {
    const task = {
      deadline: '09.03.2022',
      description: 'dasdasdt',
      id: '0md0gdJG5DfcplVyahwo',
      startDate: '10.03.2022',
      title: 'dsa',
      users: [
        { status: 'Active', userId: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2' },
        { userId: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', status: 'Active' },
      ],
    };

    expect(getReadModalState(task, users)).toEqual(result);
  });

  it('Should return wrong data to read in task modal', () => {
    const task = {
      deadline: '09.03.2022',
      description: 'dasdasdt',
      id: '0md0gdJG5DfcplVyahwo',
      startDate: '10.03.2022',
      title: 'dsa',
      users: [{ status: 'Active', userId: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2' }],
    };
    expect(getReadModalState(task, users)).not.toEqual(result);
  });
});
