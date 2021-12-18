import { createStore } from 'vuex';
import cashFlowStore from '@/store/cashflow';
import categoryStore from '@/store/category';
import userStore from '@/store/user';

const store = createStore({
  state: {
    appName: 'Money App',
  },
  modules: {
    cashflow: cashFlowStore,
    category: categoryStore,
    user: userStore,
  },
});

export default store;
