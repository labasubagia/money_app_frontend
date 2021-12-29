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
  receipt,
}) => {
  const payload = new FormData();
  payload.append('name', name);
  payload.append('amount', amount);
  payload.append('category_id', category_id);
  payload.append('note', note);
  payload.append('date', date);
  payload.append('receipt', receipt);
  const res = await axiosInstance.post(`/cashflow`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
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
  receipt,
}) => {
  const payload = new FormData();
  payload.append('name', name);
  payload.append('amount', amount);
  payload.append('category_id', category_id);
  payload.append('note', note);
  payload.append('date', date);
  payload.append('receipt', receipt);
  const res = await axiosInstance.post(`/cashflow/${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const data = await res.data;
  return data;
};

export const deleteCashFlow = async (id) => {
  const res = await axiosInstance.delete(`/cashflow/${id}`);
  const data = await res.data;
  return data;
};
