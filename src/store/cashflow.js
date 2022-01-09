import {
  getAllCashFlow,
  getCashFlowById,
  getCashFlowSummary,
} from '@/api/cashflow';

const cashFlowStore = {
  namespaced: true,

  state: {
    summary: null,
    list: [],
    detail: null,
  },

  getters: {
    totalListAmount(state) {
      return state.list.reduce(
        (total, item) => total + (item?.amount_value ?? 0),
        0
      );
    },
  },

  actions: {
    async getSummary({ commit, rootState }) {
      const payload = {
        start_date: rootState?.startDate,
        end_date: rootState?.endDate,
      };
      commit('setSummary', await getCashFlowSummary(payload));
    },

    async getAll({ commit, rootState }) {
      const payload = {
        start_date: rootState?.startDate,
        end_date: rootState?.endDate,
        category_id: rootState?.categoryId,
      };
      commit('setList', await getAllCashFlow(payload));
    },

    async getById({ commit }, id) {
      commit('setDetail', await getCashFlowById(id));
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
