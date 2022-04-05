import { getEditUserModalState } from '../userModalHelpers';

describe('User modal tests', () => {
  const result = {
    address: 'Руссиянова 4',
    averageScore: '6.6',
    birthDate: '1999-07-08',
    confirmPassword: '12345678',
    direction: '.Net',
    education: 'BSUIR',
    email: 'olegyanusik@gmail.com',
    id: 'JVEOjRdy8EbtymCd6mOvttMDdIX2',
    mathScore: '81',
    modalTitle: 'Edit member',
    name: 'React',
    password: '12345678',
    phone: '+375447608772',
    readOnly: false,
    role: 'Admin',
    sex: 'Male',
    skype: 'oleg3550',
    startDate: '2022-03-31',
    surname: 'Reduxov',
    formErrors: {
      address: '',
      averageScore: '',
      birthDate: '',
      confirmPassword: '',
      direction: '',
      education: '',
      email: '',
      mathScore: '',
      name: '',
      password: '',
      phone: '',
      role: '',
      sex: '',
      skype: '',
      startDate: '',
      surname: '',
    },
  };

  it('Should return data to read in modal', () => {
    const user = {
      address: 'Руссиянова 4',
      averageScore: '6.6',
      birthDate: '1999-07-08',
      confirmPassword: '12345678',
      direction: '.Net',
      education: 'BSUIR',
      email: 'olegyanusik@gmail.com',
      id: 'JVEOjRdy8EbtymCd6mOvttMDdIX2',
      mathScore: '81',
      name: 'React',
      password: '12345678',
      phone: '+375447608772',
      role: 'Admin',
      sex: 'Male',
      skype: 'oleg3550',
      startDate: '2022-03-31',
      surname: 'Reduxov',
    };

    const actual = getEditUserModalState(user);
    expect(actual).toEqual(result);
  });

  it('Should return wrong data to read in modal', () => {
    const user = {
      address: 'Руссиянова 4',
      averageScore: '6',
      birthDate: '1999-07-08',
      confirmPassword: '12345678',
      direction: '.Net',
      education: 'BSUIR',
      email: 'olegyanusik@gmail.com',
      id: 'JVEOjRdy8EbtymCd6mOvttMDdIX2',
      mathScore: '81',
      name: 'JS',
      password: '12345678',
      phone: '+375447608772',
      role: 'Admin',
      sex: 'Female',
      skype: 'oleg3550',
      startDate: '2022-03-31',
      surname: 'Reduxov',
    };

    const actual = getEditUserModalState(user);
    expect(actual).not.toEqual(result);
  });
});
