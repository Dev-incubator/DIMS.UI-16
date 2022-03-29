import { changeDateFormat } from '../scripts/helpers';

describe('Helper functions tests', () => {
  it('Function should change format of date', () => {
    const date1 = '13.11.2020';
    const date2 = '2020-11-13';
    expect(changeDateFormat(date1)).toEqual(date2);
  });

  it('Function should check, that changing something at all', () => {
    const date = '2020-11-13';
    expect(changeDateFormat(date)).not.toEqual(date);
  });
});
