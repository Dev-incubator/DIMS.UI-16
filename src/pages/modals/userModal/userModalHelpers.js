import { changeDateFormat, getAge, isObjectFieldsEmpty } from '../../../scripts/helpers';
import { emailRegular, phoneRegular } from '../../../scripts/regulars';
import { MODAL_VALUES, USER_MODAL_TITLES } from '../../../scripts/libraries';

const formFields = {
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

export const initStartUserModalState = {
  ...formFields,
  modalTitle: '',
  readOnly: false,
  formErrors: {
    ...formFields,
  },
};

export const getUserModalErrors = (state) => {
  const { email, password, confirmPassword, birthDate, phone } = state;
  const formErrors = { ...formFields };
  const keys = Object.keys(formErrors);
  keys.forEach((key) => {
    if (!state[key].trim()) {
      formErrors[key] = `${MODAL_VALUES[key]} is required`;
    }
  });

  if (!emailRegular.test(email)) {
    formErrors.email = 'Email is incorrect';
  }
  if (password.length < 8 || password.length > 24) {
    formErrors.password = 'Password should contains 8-24 symbols';
  } else if (password !== confirmPassword) {
    formErrors.confirmPassword = 'Passwords are not equal';
  }
  if (!phoneRegular.test(phone)) {
    formErrors.phone = 'Mobile phone is incorrect';
  }
  if (birthDate) {
    const age = getAge(changeDateFormat(birthDate));
    if (age < 18) {
      formErrors.birthDate = 'User age is lower than 18';
    }
  }

  if (!isObjectFieldsEmpty(formErrors)) {
    return formErrors;
  }

  return false;
};

export const getReadUserModalState = (user) => {
  return { ...initStartUserModalState, ...user, modalTitle: USER_MODAL_TITLES.read, readOnly: true };
};

export const getEditUserModalState = (user) => {
  return { ...initStartUserModalState, ...user, modalTitle: USER_MODAL_TITLES.edit, readOnly: false };
};

export const getCreateUserModalState = () => {
  return { ...initStartUserModalState, modalTitle: USER_MODAL_TITLES.create, readOnly: false };
};

export const getModalUserData = (state) => {
  const keys = Object.keys(formFields);
  const data = {};
  keys.forEach((key) => {
    data[key] = state[key].trim();
  });

  return data;
};
