import axios from 'axios';
import { STORAGE_KEYS } from './constants';

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.token);
};

export const getCurrentUserId = () => {
  return localStorage.getItem(STORAGE_KEYS.userId);
};

const authToken = getToken();

export const instance = axios.create({
  baseURL: 'https://dims-core-api.herokuapp.com/api/',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

instance.interceptors.request.use(async (req) => {
  if (!authToken) {
    const token = getToken();
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const createUser = async (data) => {
  try {
    const res = await instance.post('users', data);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const getUsers = async () => {
  try {
    const res = await instance.get('users');

    return res.data.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = await instance.delete(`users/${userId}`);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const getUserTask = async (userId, taskId) => {
  try {
    const res = await instance.get(`users/${userId}/user-tasks/${taskId}`);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const getTask = async (taskId) => {
  try {
    const res = await instance.get(`tasks/${taskId}`);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const getTasks = async () => {
  try {
    const res = await instance.get('tasks');

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const getUser = async (userId) => {
  try {
    const res = await instance.get(`users/${userId}`);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const createTask = async (task) => {
  try {
    const res = await instance.post('tasks', task);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const updateTask = async (taskId, task) => {
  try {
    const res = await instance.patch(`tasks/${taskId}`, task);

    return res.data;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const logIn = async (email, password) => {
  try {
    const res = await instance.post('auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem(STORAGE_KEYS.token, token);
    const users = await getUsers();
    const { userId } = users.find((el) => el.email === email);
    if (userId) {
      localStorage.setItem(STORAGE_KEYS.userId, userId);
    }

    return token;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const getDirections = async () => {
  try {
    const res = await instance.get('directions');

    return res.data.map((item) => item.name);
  } catch (error) {
    console.error(error);

    return undefined;
  }
};
