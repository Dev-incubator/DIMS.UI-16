import { deepEqual } from '../scripts/helpers';

it('Function should compare two objects', () => {
  const obj1 = { name: 'Oleg', age: '17' };
  const obj2 = { age: '17', name: 'Oleg' };
  const obj3 = { value: 1 };
  const obj4 = { value: null };
  expect(deepEqual(obj1, obj2)).toEqual(true);
  expect(deepEqual(obj3, obj4)).toEqual(false);
});
