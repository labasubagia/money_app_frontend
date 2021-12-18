import axiosInstance from '@/helpers/axios';

const cashFlowStore = {
  namespaced: true,

  state: {
    summary: null,
    list: [],
    detail: null,
  },

  actions: {
    async getSummary() {
      const res = await axiosInstance.get('/cashflow/summary');
      const data = await res.data;
      return data;
    },

    async getAll(ctx) {
      const res = await axiosInstance.get('/cashflow');
      const data = await res.data;
      return data;
    },

    async getById(ctx, id) {
      const res = await axiosInstance.get(`/cashflow/${id}`);
      const data = await res.data;
      return data;
    },

    async create(ctx, { name, amount, category_id, note, date }) {
      const payload = { name, amount, category_id, note, date };
      const res = await axiosInstance.post(`/cashflow`, payload);
      const data = await res.data;
      return data;
    },

    async update(ctx, { id, name, amount, category_id, note, date }) {
      const payload = { name, amount, category_id, note, date };
      const res = await axiosInstance.post(`/cashflow/${id}`, payload);
      const data = await res.data;
      return data;
    },

    async delete(ctx, id) {
      const res = await axiosInstance.delete(`/cashflow/${id}`);
      const data = await res.data;
      return data;
    },
  },

  mutations: {
    setSummary(state, payload) {
      state.summary = payload;
    },
    setList(state, payload) {
      state.list = payload;
    },
    setDetail(state, payload) {
      state.detail = payload;
    },
  },
};

export default cashFlowStore;
