import { deepEqual } from '../scripts/helpers';

describe('Helper functions tests', () => {
  it('Should compare two objects', () => {
    const obj1 = { name: 'Oleg', age: '17' };
    const obj2 = { age: '17', name: 'Oleg' };
    expect(deepEqual(obj1, obj2)).toBeTruthy();
  });
  it('Should check, that objects are not equal', () => {
    const obj3 = { value: 1 };
    const obj4 = { value: null };
    expect(deepEqual(obj3, obj4)).not.toBeTruthy();
  });
});
