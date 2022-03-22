import { getEditModalState } from '../taskModalHelpers';

it('Function returns data to edit in modal', () => {
  const users = [
    { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor' },
    { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima' },
    { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx' },
  ];
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

  const result = {
    deadline: '2022-03-09',
    description: 'dasdasdt',
    formErrors: {
      deadline: '',
      description: '',
      startDate: '',
      title: '',
      users: '',
    },
    modalTitle: 'Edit task',
    readOnly: false,
    startDate: '2022-03-10',
    title: 'dsa',
    usersTask: [
      { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', value: true, name: 'Prohor' },
      { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', value: true, name: 'Dima' },
      { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', value: false, name: 'vscx' },
    ],
  };

  expect(getEditModalState(task, users)).toEqual(result);
});
