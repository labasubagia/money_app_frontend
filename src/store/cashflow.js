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

  actions: {
    async getSummary({ commit }, { start_date, end_date } = {}) {
      commit('setSummary', await getCashFlowSummary({ start_date, end_date }));
    },

    async getAll({ commit }, { start_date, end_date } = {}) {
      commit('setList', await getAllCashFlow({ start_date, end_date }));
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
