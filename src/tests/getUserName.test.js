import { getUserName } from '../scripts/helpers';

describe('Helper functions tests', () => {
  it('Should return username from email', () => {
    const user = {
      email: 'oleg@gmail.com',
    };
    const actual = getUserName(user);
    expect(actual).toBe('oleg');
  });

  it('Should return unsuccessfully value', () => {
    const user = {
      email: 'misha@gmail.com',
    };
    const actual = getUserName(user);
    expect(actual).not.toBe('oleg');
  });
});
