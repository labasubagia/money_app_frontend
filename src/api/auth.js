import { setToken } from '@/helpers/auth';
import axiosInstance from '@/helpers/axios';

export const login = async ({ email, password }) => {
  const payload = { email, password };
  const res = await axiosInstance.post('/auth/login', payload);
  const data = await res.data;
  const { token } = data;
  if (token) setToken(token);
  return data;
};

export const register = ({ email, name, password }) => {
  const payload = { email, name, password };
  const res = await axiosInstance.post('/auth/register', payload);
  const data = await res.data;
  return data;
};
