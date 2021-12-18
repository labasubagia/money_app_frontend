import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') ?? null;
  config.headers.Authorization = token;
  return config;
});

export default axiosInstance;
