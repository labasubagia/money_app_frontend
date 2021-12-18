import { createStore } from 'vuex';
import authStore from '@/store/auth';

const store = createStore({
  modules: {
    auth: authStore,
  },
});

export default store;
