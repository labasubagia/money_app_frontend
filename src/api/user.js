import axiosInstance from '@/helpers/axios';

export const updateUser = async ({ name, email, password }) => {
  const payload = { name, email, password };
  const res = await axiosInstance.post(`/user`, payload);
  const data = await res.data;
  return data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get('/user');
  const data = await res.data;
  return data?.data ?? null;
};
