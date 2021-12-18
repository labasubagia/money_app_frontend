import axiosInstance from '@/helpers/axios';

const cashFlowStore = {
  namespaced: true,

  state: {
    detail: null,
  },

  actions: {
    async update(ctx, { name, email, password }) {
      const payload = { name, email, password };
      const res = await axiosInstance.post(`/user`, payload);
      const data = await res.data;
      return data;
    },
  },
};

export default cashFlowStore;
