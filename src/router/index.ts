import { createRouter, createWebHistory } from 'vue-router'
import { Auth } from '../utils/auth' 

import HomePage from '../views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import RecoveryPasswordPage from '@/views/RecoveryPasswordPage.vue'
import RecoveryPasswordEmailPage from '@/views/RecoveryPasswordEmailPage.vue'
import PerfilPage from '@/views/PerfilPage.vue'


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
      name: 'perfil',
      meta: { requiresAuth: true },
      component: PerfilPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = new Auth();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Esta rota requer autenticação
    if (!auth.isLoggedIn()) {
      // Se o usuário não estiver autenticado, redirecione-o para a página de login
      next('/')
    } else {
      // Se o usuário estiver autenticado, permita o acesso à rota
      next()
    }
  } else {
    // Esta rota não requer autenticação, permita o acesso diretamente
    next()
  }
})
export default router
