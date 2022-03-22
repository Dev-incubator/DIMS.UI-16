import { getTrackModalErrors } from '../trackModalHelpers';

it('Function should return validation errors of track modal', () => {
  const state = {
    note: 'dsds',
    date: '12.20.2020',
  };
  expect(getTrackModalErrors(state)).toEqual(false);

  const state1 = {
    note: '',
    date: '19.20.2020',
  };
  const result = { date: '', note: 'Note is required' };
  expect(getTrackModalErrors(state1)).toEqual(result);
});
