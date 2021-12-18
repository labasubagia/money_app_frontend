import axiosInstance from '@/lib/axios';

const authStore = {
  namespaced: true,

  actions: {
    async login(ctx, { email, password }) {
      const payload = { email, password };
      const res = await axiosInstance.post('/auth/login', payload);
      const data = await res.data;
      const { token } = data;
      if (token) localStorage.setItem('token', token);
      return data;
    },

    async register(ctx, { email, name, password }) {
      const payload = { email, name, password };
      const res = await axiosInstance.post('/auth/register', payload);
      const data = await res.data;
      return data;
    },
  },
};

export default authStore;
