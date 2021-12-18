import axios from 'axios';
import { getToken } from '@/helpers/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = getToken();
  return config;
});

export default axiosInstance;
