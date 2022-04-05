import { changeDateFormat } from '../scripts/helpers';

describe('Helper functions tests', () => {
  it('Should change format of date', () => {
    const actual = changeDateFormat('13.11.2020');

    expect(actual).toEqual('2020-11-13');
  });

  it('Should check, that changing something at all', () => {
    const actual = changeDateFormat('2020-11-13');
    expect(actual).not.toEqual('2020-11-13');
  });
});
