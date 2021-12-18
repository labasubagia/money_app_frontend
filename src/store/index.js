import { createStore } from 'vuex';
import authStore from '@/store/auth';
import cashFlowStore from './cashflow';
import categoryStore from './category';

const store = createStore({
  state: {
    appName: 'Money App',
  },
  modules: {
    auth: authStore,
    cashflow: cashFlowStore,
    category: categoryStore,
  },
});

export default store;
