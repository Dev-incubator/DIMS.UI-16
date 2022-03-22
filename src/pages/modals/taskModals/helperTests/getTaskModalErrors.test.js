import { getTaskModalErrors } from '../taskModalHelpers';

it('Function should check, has modal validation errors or not', () => {
  const state1 = {
    deadline: '2022-03-17',
    startDate: '2022-03-11',
    title: '12345',
    usersTask: [
      { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor', value: true },
      { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima', value: true },
      { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx', value: false },
    ],
  };

  const state2 = {
    deadline: '2022-03-17',
    startDate: '2022-03-11',
    title: '12345',
    usersTask: [],
  };

  expect(getTaskModalErrors(state1)).toEqual(false);
  expect(getTaskModalErrors(state2)).toEqual({
    deadline: '',
    startDate: '',
    title: '',
    users: 'At least one member must be assigned',
  });
});
