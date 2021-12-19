import { getProfile } from '@/api/user';

const userStore = {
  namespaced: true,

  state: {
    detail: null,
  },

  actions: {
    async getProfile({ commit }) {
      commit('setDetail', await getProfile());
    },
  },

  mutations: {
    setDetail(state, payload) {
      state.detail = payload;
    },
  },
};

export default userStore;
