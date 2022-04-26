import axios from 'axios';

export const getToken = () => {
  return localStorage.getItem('token');
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

export const logIn = async (email, password) => {
  try {
    const res = await instance.post('auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem('token', token);

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
