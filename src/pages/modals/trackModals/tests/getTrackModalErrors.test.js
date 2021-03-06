import { getTrackModalErrors } from '../trackModalHelpers';

describe('Track modal tests', () => {
  it('Should return that it is no errors in modal', () => {
    const state = {
      note: 'dsds',
      date: '12.20.2020',
    };
    expect(getTrackModalErrors(state)).toBeNull();
  });

  it('Should return validation errors of track modal', () => {
    const state1 = {
      note: '',
      date: '19.20.2020',
    };

    const result = { date: '', note: 'Note is required' };
    expect(getTrackModalErrors(state1)).toEqual(result);
  });
  it('Should return validation errors of track modal unsuccessfully', () => {
    const state = {
      note: 'fd',
      date: '19.20.2020',
    };
    const result = { date: '', note: 'Note is required' };
    expect(getTrackModalErrors(state)).not.toEqual(result);
  });
});
