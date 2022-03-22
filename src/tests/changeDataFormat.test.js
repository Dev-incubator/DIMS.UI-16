import { changeDateFormat } from '../scripts/helpers';

it('Function should change format of date', () => {
  const date1 = '13.11.2020';
  const date2 = '2020-11-13';
  expect(changeDateFormat(date1)).toEqual(date2);
  expect(changeDateFormat(date2)).toEqual(date1);
});
