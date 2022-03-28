import { gatherTrackModalState } from '../trackModalHelpers';

describe('Track modal tests', () => {
  it('Function should gather state to track modal', () => {
    const track = {
      date: '04.03.2022',
      id: 'JhXh6ZYbxNaq6XsF4iCG',
      note: 'dasaddas',
      taskId: '5I7RbigLvVExMPnmk6a1',
      taskTitle: 'Create button',
      userId: 'Mnj7ER92EfOGm7txx4ZnRUjY8Lr1',
    };
    const taskName = 'Create button';

    const taskName2 = 'Create smth';

    const result = {
      date: '2022-03-04',
      formErrors: { date: '', note: '' },
      modalTitle: 'Edit task track',
      note: 'dasaddas',
      readOnly: false,
      taskName: 'Create button',
    };
    expect(gatherTrackModalState(track, taskName)).toEqual(result);
    expect(gatherTrackModalState(track, taskName2)).not.toEqual(result);
  });
});
