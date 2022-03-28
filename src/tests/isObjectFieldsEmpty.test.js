import { isObjectFieldsEmpty } from '../scripts/helpers';

describe('Helper functions tests', () => {
  it('Function returns true when fields of object are empty', () => {
    const obj1 = {
      name: '',
      age: '',
      value: null,
    };
    const obj2 = {};
    const obj3 = { value: 2 };
    expect(isObjectFieldsEmpty(obj1)).toBeTruthy();
    expect(isObjectFieldsEmpty(obj2)).toBeTruthy();
    expect(isObjectFieldsEmpty(obj3)).toBeFalsy();
  });
});
