import { isObjectFieldsEmpty } from '../../scripts/helpers';

export const changePasswordFields = {
  password: '',
  newPassword: '',
};

export const initChangePasswordState = {
  ...changePasswordFields,
  errors: {
    ...changePasswordFields,
  },
};
export const getChangePasswordErrors = (user, state) => {
  const { password, newPassword } = state;
  const errors = { ...changePasswordFields };
  if (user.password !== password) {
    errors.password = 'Password is incorrect';

    return errors;
  }
  if (newPassword.length < 8 || newPassword.length > 24) {
    errors.newPassword = 'Password should contains 8-24 symbols';
  }
  if (newPassword === user.password) {
    errors.newPassword = 'New password is equal to current';
  }

  if (!isObjectFieldsEmpty(errors)) {
    return errors;
  }

  return false;
};
