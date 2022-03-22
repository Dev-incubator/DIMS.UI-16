import { getTrackModalErrors } from '../trackModalHelpers';

it('Function should return validation errors of track modal', () => {
  const note = 'dsds';
  const date = '12.20.2020';
  expect(getTrackModalErrors(note, date)).toEqual(false);

  const note1 = '';
  const date1 = '19.20.2020';
  const result = { date: '', note: 'Note is required' };
  expect(getTrackModalErrors(note1, date1)).toEqual(result);
});
