import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import RecoveryPasswordPage from '@/views/RecoveryPasswordPage.vue'

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
  ]
})

export default router
