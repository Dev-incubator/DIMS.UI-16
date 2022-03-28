import { getTrackModalErrors } from '../trackModalHelpers';

describe('Track modal tests', () => {
  it('Function should return validation errors of track modal', () => {
    const state = {
      note: 'dsds',
      date: '12.20.2020',
    };
    expect(getTrackModalErrors(state)).toBeFalsy();

    const state1 = {
      note: '',
      date: '19.20.2020',
    };

    const state2 = {
      note: 'fd',
      date: '19.20.2020',
    };

    const result = { date: '', note: 'Note is required' };
    expect(getTrackModalErrors(state1)).toEqual(result);
    expect(getTrackModalErrors(state2)).not.toEqual(result);
  });
});
