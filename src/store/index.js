import { createStore } from 'vuex';
import cashFlowStore from '@/store/cashflow';
import categoryStore from '@/store/category';
import userStore from '@/store/user';
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from '@/helpers/date';

const store = createStore({
  modules: {
    cashflow: cashFlowStore,
    category: categoryStore,
    user: userStore,
  },

  state: {
    appName: 'Money App',
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
    categoryId: undefined,
  },

  mutations: {
    setStartDate(state, value) {
      state.startDate = value;
    },
    setEndDate(state, value) {
      state.endDate = value;
    },
    setCategoryId(state, value) {
      state.categoryId = value;
    },
  },
});

export default store;
