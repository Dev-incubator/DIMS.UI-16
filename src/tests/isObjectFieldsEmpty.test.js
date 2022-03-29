import { isObjectFieldsEmpty } from '../scripts/helpers';

describe('Helper functions tests', () => {
  it('Function should return that object fields are empty', () => {
    const obj = {
      name: '',
      age: '',
      value: null,
    };
    expect(isObjectFieldsEmpty(obj)).toBeTruthy();
  });

  it('Function should return that object fields are not empty', () => {
    const obj = { value: 2 };
    expect(isObjectFieldsEmpty(obj)).toBeFalsy();
  });
});
