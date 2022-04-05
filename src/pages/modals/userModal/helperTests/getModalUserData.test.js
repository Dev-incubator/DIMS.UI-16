import { getModalUserData } from '../userModalHelpers';

describe('User modal tests', () => {
  const result = {
    address: 'pushkina',
    averageScore: '81',
    birthDate: '2001-10-05',
    confirmPassword: '12345678',
    direction: '.Net',
    education: 'BSUIR',
    email: 'messi@gmail.com',
    mathScore: '82',
    name: 'Oleg',
    password: '12345678',
    phone: '+375291111111',
    role: 'Admin',
    sex: 'male',
    skype: 'cristiano',
    startDate: '2022-10-05',
    surname: 'Ronaldo',
  };

  it('Should return data in user modal', () => {
    const state = {
      name: 'Oleg',
      surname: 'Ronaldo',
      email: 'messi@gmail.com',
      direction: '.Net',
      sex: 'male',
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
      modalTitle: 'Create user',
    };
    const actual = getModalUserData(state);
    expect(actual).toEqual(result);
  });

  it('Should return wrong data from user modal', () => {
    const state = {
      name: 'Sanchez',
      surname: 'Pros',
      email: 'messi@gmail.com',
      direction: '.Net',
      sex: 'male',
      role: 'Admin',
      password: '12345678',
      confirmPassword: '12345678',
      birthDate: '2001-10-05',
      address: 'something',
      phone: '+375291111111',
      skype: 'cristiano',
      startDate: '2022-10-05',
      education: 'BSUIR',
      averageScore: '81',
      mathScore: '82',
      modalTitle: 'Create user',
    };
    const actual = getModalUserData(state);
    expect(actual).not.toEqual(result);
  });
});
