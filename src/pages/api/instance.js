import axios from 'axios';
import { getToken } from './storage';

const authToken = getToken();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

instance.interceptors.request.use(async (req) => {
  if (!authToken) {
    const token = getToken();
    req.headers.Authorization = `Bearer ${token}`;
  }
  console.log(req.headers.Authorization);

  return req;
});
