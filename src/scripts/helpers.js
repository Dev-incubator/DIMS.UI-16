import { encryptId } from './crypt';
import { cryptedIdRegular } from './regulars';

export function changeDateFormat(date) {
  if (date.includes('.')) {
    return date.split('.').reverse().join('-');
  }

  return date.split('-').reverse().join('.');
}

export function deepEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  if (obj1 === undefined || obj2 === undefined) {
    return false;
  }
  if (obj1 === null || obj2 === null) {
    return false;
  }
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  for (let i = 0; i < obj1Keys.length; i += 1) {
    if (obj2Keys.includes(obj1Keys[i]) === false) {
      return false;
    }
  }
  for (let i = 0; i < obj1Keys.length; i += 1) {
    if (typeof obj1[obj1Keys[i]] === 'object' && obj1[obj1Keys[i]] !== null) {
      return deepEqual(obj1[obj1Keys[i]], obj2[obj1Keys[i]]);
    }
    if (obj1[obj1Keys[i]] !== obj2[obj2Keys[i]]) {
      return false;
    }
  }

  return true;
}

export const isObjectFieldsEmpty = (obj) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (obj[keys[i]]) {
      return false;
    }
  }

  return true;
};

export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString.split('-').join(','));
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export function getUid(url) {
  const cryptedId = url.match(cryptedIdRegular).pop();

  return encryptId(cryptedId);
}

export const getUserName = (user) => {
  return user?.email.split('@')[0];
};

export const getFullName = (name, surname) => {
  return `${name} ${surname}`;
};

export const isPasswordValid = (password) => {
  return password.length >= 8 && password.length <= 24;
};
