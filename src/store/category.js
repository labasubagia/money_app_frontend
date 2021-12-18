import axiosInstance from '@/helpers/axios';

const categoryStore = {
  namespaced: true,

  state: {
    list: [],
    detail: null,
  },

  actions: {
    async getAll(ctx) {
      const res = await axiosInstance.get('/category');
      const data = await res.data;
      return data;
    },

    async getById(ctx, id) {
      const res = await axiosInstance.get(`/category/${id}`);
      const data = await res.data;
      return data;
    },

    async create(ctx, { name, type }) {
      const res = await axiosInstance.post(`/category`, { name, type });
      const data = await res.data;
      return data;
    },

    async update(ctx, { id, name, type }) {
      const res = await axiosInstance.post(`/category/${id}`, { name, type });
      const data = await res.data;
      return data;
    },

    async delete(ctx, id) {
      const res = await axiosInstance.delete(`/category/${id}`);
      const data = await res.data;
      return data;
    },
  },

  mutations: {
    setList(state, payload) {
      state.list = payload;
    },
    setDetail(state, payload) {
      state.detail = payload;
    },
  },
};

export default categoryStore;
