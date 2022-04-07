import { getAge } from '../scripts/helpers';

describe('Function returns age from date string', () => {
  it('Should return age', () => {
    const actual = getAge('2012-04-22');

    expect(actual).toBe(9);
  });

  it('Should return some value', () => {
    const actual = getAge('2020-03-21');

    expect(actual).not.toBeUndefined();
  });
});
