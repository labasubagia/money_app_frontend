import axiosInstance from '@/helpers/axios';
import moment from 'moment';

export const getCashFlowSummary = async ({
  start_date = moment().startOf('month').toDate(),
  end_date = moment().endOf('month').toDate(),
} = {}) => {
  const params = { start_date, end_date };
  const res = await axiosInstance.get('/cashflow/summary', { params });
  const data = await res.data;
  return data?.data ?? null;
};

export const getAllCashFlow = async () => {
  const res = await axiosInstance.get('/cashflow');
  const data = await res.data;
  return data?.data ?? [];
};

export const getCashFlowById = async (id) => {
  const res = await axiosInstance.get(`/cashflow/${id}`);
  const data = await res.data;
  return data?.data ?? null;
};

export const createCashFlow = async ({
  name,
  amount,
  category_id,
  note,
  date,
}) => {
  const payload = { name, amount, category_id, note, date };
  const res = await axiosInstance.post(`/cashflow`, payload);
  const data = await res.data;
  return data;
};

export const updateCashFlow = async ({
  id,
  name,
  amount,
  category_id,
  note,
  date,
}) => {
  const payload = { name, amount, category_id, note, date };
  const res = await axiosInstance.post(`/cashflow/${id}`, payload);
  const data = await res.data;
  return data;
};

export const deleteCashFlow = async (id) => {
  const res = await axiosInstance.delete(`/cashflow/${id}`);
  const data = await res.data;
  return data;
};
