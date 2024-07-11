import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Signup from '../views/SignupView.vue'
import Dashboard from '../views/DashboardView.vue'
import BookDetails from '../views/BookDetailsView.vue'
import { useBookStore } from '@/stores/bookStore'
import Cart from '../components/Cart.vue'
import OrderConfirmation from '../components/OrderConfirmation.vue'
import { useCartStore } from '../stores/CartStore'
import UserProfile from '../components/UserProfile.vue'
import WishList from '../components/WishList.vue'
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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: async (to, from, next) => {
        const bookStore = useBookStore()
        if (!bookStore.books.length) {
          await bookStore.fetchBooks()
        }
        next()
      }
    },
    {
      path: '/dashboard/book/:id',
      name: 'bookdetails',
      component: BookDetails,
      props: true
    },
    
    {
      path: '/order-confirmation',
      name: 'OrderConfirmation',
      component: OrderConfirmation
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      beforeEnter: async (to, from, next) => {
        const cartStore = useCartStore()
        await cartStore.fetchCartItems()
        next()
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: UserProfile
    },
    {
      path:'/WishList',
      name:'WishList',
      component:WishList
    }

  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
