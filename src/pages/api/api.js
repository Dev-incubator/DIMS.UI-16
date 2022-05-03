import { instance } from './instance';
import { STORAGE_KEYS } from './constants';

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
    const { id } = users.find((el) => el.email === email);
    if (id) {
      localStorage.setItem(STORAGE_KEYS.userId, id);
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
