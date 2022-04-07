import { getAge, isObjectFieldsEmpty, isPasswordValid } from '../../../scripts/helpers';
import { emailRegular, phoneRegular } from '../../../scripts/regulars';
import { MODAL_VALUES, USER_TITLES } from '../../../constants/libraries';

const fields = {
  name: '',
  surname: '',
  email: '',
  direction: '',
  sex: '',
  role: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  address: '',
  phone: '',
  skype: '',
  startDate: '',
  education: '',
  averageScore: '',
  mathScore: '',
};

export const userModalState = {
  ...fields,
  title: '',
  readOnly: false,
  errors: {
    ...fields,
  },
};

export const getUserModalErrors = (state) => {
  const { email, password, confirmPassword, birthDate, phone } = state;
  const errors = { ...fields };
  const keys = Object.keys(errors);
  keys.forEach((key) => {
    if (!state[key].trim()) {
      errors[key] = `${MODAL_VALUES[key]} is required`;
    }
  });

  if (!emailRegular.test(email)) {
    errors.email = 'Email is incorrect';
  }
  if (!isPasswordValid(password)) {
    errors.password = 'Password should contains 8-24 symbols';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords are not equal';
  }
  if (!phoneRegular.test(phone)) {
    errors.phone = 'Mobile phone is incorrect';
  }
  if (birthDate) {
    const age = getAge(birthDate);
    if (age < 18) {
      errors.birthDate = 'User age is lower than 18';
    }
  }

  if (!isObjectFieldsEmpty(errors)) {
    return errors;
  }

  return null;
};

const getModalTitle = (user, readOnly) => {
  if (readOnly && user) {
    return USER_TITLES.read;
  }
  if (user) {
    return USER_TITLES.edit;
  }

  return USER_TITLES.read;
};

export const getUserModalState = (user = null, readOnly = false) => {
  const title = getModalTitle(user, readOnly);

  return { ...userModalState, ...user, title, readOnly };
};

export const getModalUserData = (state) => {
  const keys = Object.keys(fields);
  const data = {};
  keys.forEach((key) => {
    data[key] = state[key].trim();
  });

  return data;
};
