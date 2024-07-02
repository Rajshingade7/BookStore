import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Signup from '../views/SignupView.vue'
import Dashboard from '../views/DashboardView.vue'
import BookDetails from '../views/BookDetailsView.vue'
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
      component: Dashboard,
    },
    {
      path: '/dashboard/book/:id',
      name: 'bookdetails',
      component: BookDetails,
      props: true,
    },
    {
      path:'/newcomponent',
      name:'newcomponent',
      component: () => import('../components/newComponent.vue')
    }
  ]
})

export default router
