import axiosInstance from '@/helpers/axios';

export const getAllCategory = async () => {
  const res = await axiosInstance.get('/category');
  const data = await res.data;
  return data?.data ?? [];
};

export const getCategoryById = async (id) => {
  const res = await axiosInstance.get(`/category/${id}`);
  const data = await res.data;
  return data?.data ?? null;
};

export const createCategory = async ({ name, type }) => {
  const res = await axiosInstance.post(`/category`, { name, type });
  const data = await res.data;
  return data;
};

export const updateCategory = async ({ id, name, type }) => {
  const res = await axiosInstance.post(`/category/${id}`, { name, type });
  const data = await res.data;
  return data;
};

export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/category/${id}`);
  const data = await res.data;
  return data;
};
