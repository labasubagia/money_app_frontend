const categoryStore = {
  namespaced: true,

  state: {
    list: [],
    detail: null,
  },

  actions: {
    async getAll({ commit }) {
      commit('setList', await getAllCategory());
    },

    async getById({ commit }, id) {
      commit('setDetail', await getCategoryById(id));
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
