import { STORAGE_KEYS } from './constants';

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.token);
};

export const getCurrentUserId = () => {
  return localStorage.getItem(STORAGE_KEYS.userId);
};

export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.token);
};

export const removeCurrentUserid = () => {
  localStorage.removeItem(STORAGE_KEYS.userId);
};
