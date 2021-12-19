import { createRouter, createWebHashHistory } from 'vue-router';
import { isAuthenticated } from './helpers/auth';

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
      component: () => import('@/pages/Category/index.vue'),
    },
    {
      path: '/category/add',
      name: 'CategoryAdd',
      component: () => import('@/pages/Category/form.vue'),
    },
    {
      path: '/category/edit/:id',
      name: 'CategoryEdit',
      component: () => import('@/pages/Category/form.vue'),
    },
    {
      path: '/cashflow',
      name: 'CashFlow',
      component: () => import('@/pages/CashFlow/index.vue'),
    },
    {
      path: '/cashflow/add',
      name: 'CashFlowAdd',
      component: () => import('@/pages/CashFlow/form.vue'),
    },
    {
      path: '/cashflow/edit/:id',
      name: 'CashFlowEdit',
      component: () => import('@/pages/CashFlow/form.vue'),
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: () => import('@/pages/EditProfile.vue'),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const isToAuthPage = ['Login', 'Register'].includes(to.name);

  if (!isAuthenticated() && !isToAuthPage) {
    return '/login';
  }

  if (isAuthenticated() && isToAuthPage) {
    return from.path;
  }
});

export default router;
