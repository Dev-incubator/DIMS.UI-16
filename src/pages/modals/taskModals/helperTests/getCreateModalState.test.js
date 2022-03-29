import { getCreateModalState } from '../taskModalHelpers';

describe('Task modal tests', () => {
  const result = {
    deadline: '',
    description: '',
    formErrors: { deadline: '', description: '', startDate: '', title: '', users: '' },
    modalTitle: 'Create new task',
    readOnly: false,
    startDate: '',
    title: '',
    usersTask: [
      { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor', value: false },
      { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima', value: false },
      { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx', value: false },
    ],
  };

  it('Function should return state to create task in modal', () => {
    const users = [
      { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor' },
      { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima' },
      { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx' },
    ];

    expect(getCreateModalState(users)).toEqual(result);
  });

  it('Function should return wrong state to create task in modal', () => {
    const users = [
      { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor' },
      { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima' },
    ];

    expect(getCreateModalState(users)).not.toEqual(result);
  });
});
