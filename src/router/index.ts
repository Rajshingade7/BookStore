import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Signup from '../views/SignupView.vue'
import Dashboard from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: Dashboard
    },
  ]
})

export default router
