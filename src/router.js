import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register.vue'),
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/pages/Category.vue'),
    },
    {
      path: '/cashflow',
      name: 'CashFlow',
      component: () => import('@/pages/CashFlow.vue'),
    },
    {
      path: '/edit-profile',
      name: 'Edit Profile',
      component: () => import('@/pages/EditProfile.vue'),
    },
  ],
});

export default router;
