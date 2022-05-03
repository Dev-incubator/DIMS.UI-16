import { STORAGE_KEYS } from './constants';

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.token);
};

export const getCurrentUserId = () => {
  return localStorage.getItem(STORAGE_KEYS.userId);
};
