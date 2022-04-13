import { getTaskModalErrors } from '../taskModalHelpers';

describe('Task modal tests', () => {
  it('Should return validation errors from modal', () => {
    const state = {
      deadline: '2022-03-17',
      startDate: '2022-03-11',
      title: '12345',
      usersTask: [],
    };
    const result = {
      deadline: '',
      startDate: '',
      title: '',
      users: 'At least one member must be assigned',
    };
    expect(getTaskModalErrors(state)).toEqual(result);
  });

  it('Should return that it is no error in modal', () => {
    const state = {
      deadline: '2022-03-17',
      startDate: '2022-03-11',
      title: '12345',
      usersTask: [
        { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor', value: true },
        { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima', value: true },
        { id: 'hwvzuSySXaWFi82ROqaw6BU43tf1', name: 'vscx', value: false },
      ],
    };
    expect(getTaskModalErrors(state)).toBeNull();
  });

  it('Should should check, has modal validation errors or not unsuccessfully', () => {
    const state = {
      deadline: '2022-03-17',
      startDate: '2022-03-11',
      title: '',
      usersTask: [
        { id: 'EYzZEFH2vCh8Bz0xYbXxHbzZdWG2', name: 'Prohor', value: true },
        { id: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1', name: 'Dima', value: true },
      ],
    };

    expect(getTaskModalErrors(state)).not.toBeNull();
  });
});
