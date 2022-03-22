import { isObjectFieldsEmpty } from '../scripts/helpers';

it('Function returns true when fields of object are empty', () => {
  const obj1 = {
    name: '',
    age: '',
    value: null,
  };
  const obj2 = {};
  const obj3 = { value: 2 };
  expect(isObjectFieldsEmpty(obj1)).toEqual(true);
  expect(isObjectFieldsEmpty(obj2)).toEqual(true);
  expect(isObjectFieldsEmpty(obj3)).toEqual(false);
});
