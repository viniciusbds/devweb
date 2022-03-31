import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import AuthService from './AuthService';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const token = AuthService.getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
