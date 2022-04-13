import { getUserModalErrors } from '../userModalHelpers';

describe('User modal tests', () => {
  it('Should return that it is no error in modal', () => {
    const state = {
      name: 'Oleg',
      surname: 'Ronaldo',
      email: 'messi@gmail.com',
      direction: '.Net',
      sex: 'ne bylo',
      role: 'Admin',
      password: '12345678',
      confirmPassword: '12345678',
      birthDate: '2001-10-05',
      address: 'pushkina',
      phone: '+375291111111',
      skype: 'cristiano',
      startDate: '2022-10-05',
      education: 'BSUIR',
      averageScore: '81',
      mathScore: '82',
    };
    const actual = getUserModalErrors(state);
    expect(actual).toBeNull();
  });

  it('Should return errors in modal', () => {
    const state = {
      name: 'Oleg',
      surname: 'Ronaldo',
      email: 'messi@gmail.com',
      direction: '.Net',
      sex: 'ne bylo',
      role: '',
      password: '12345678',
      confirmPassword: '12345678',
      birthDate: '2021-10-05',
      address: 'pushkina',
      phone: '+375291111111',
      skype: 'cristiano',
      startDate: '2022-10-05',
      education: 'BSUIR',
      averageScore: '81',
      mathScore: '82',
    };
    const actual = getUserModalErrors(state);
    expect(actual).toEqual({
      address: '',
      averageScore: '',
      birthDate: 'User age is lower than 18',
      confirmPassword: '',
      direction: '',
      education: '',
      email: '',
      mathScore: '',
      name: '',
      password: '',
      phone: '',
      role: 'Role is required',
      sex: '',
      skype: '',
      startDate: '',
      surname: '',
    });
  });

  it('Should return something at all', () => {
    const state = {
      name: '',
      surname: '',
      email: 'messi@gmail.com',
      direction: '.Net',
      sex: 'ne bylo',
      role: 'Admin',
      password: '12345678',
      confirmPassword: '12345678',
      birthDate: '2021-10-05',
      address: 'pushkina',
      phone: '+375291111111',
      skype: 'cristiano',
      startDate: '2022-10-05',
      education: 'BSUIR',
      averageScore: '81',
      mathScore: '82',
    };
    const actual = getUserModalErrors(state);
    expect(actual).not.toBeNull();
  });
});
