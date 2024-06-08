import { createRouter, createWebHistory } from 'vue-router';
import { Auth } from '../utils/auth'; 

import HomePage from '../views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import RecoveryPasswordPage from '@/views/RecoveryPasswordPage.vue';
import RecoveryPasswordEmailPage from '@/views/RecoveryPasswordEmailPage.vue';
import PerfilPage from '@/views/PerfilPage.vue';
import ManageStorePage from '@/views/ManageStorePage.vue';
import OrderPage from '@/views/OrderPage.vue';
import NotFoundView from '@/views/NotFoundView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegisterPage
    },
    {
      path: '/recuperar-senha',
      name: 'recuperar-senha',
      component: RecoveryPasswordPage
    },
    {
      path: '/recuperar-senha-link',
      name: 'recuperar-senha-link',
      component: RecoveryPasswordEmailPage
    },
    {
      path: '/dashboard/perfil',
      name: '/dashboard/perfil',
      meta: { requiresAuth: true },
      component: PerfilPage
    },
    {
      path: '/dashboard/gerenciar-loja',
      name: '/dashboard/gerenciar-loja',
      meta: { requiresAuth: true },
      component: ManageStorePage
    },
    {
      path: '/dashboard/pedidos',
      name: '/dashboard/pedidos',
      meta: { requiresAuth: true },
      component: OrderPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/ChatPage.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const auth = new Auth();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next('/');
    } else {
      next();
    }
  } else if (auth.isLoggedIn()) {
    next('/dashboard/perfil');
  } else {
    next();
  }
});
export default router;
