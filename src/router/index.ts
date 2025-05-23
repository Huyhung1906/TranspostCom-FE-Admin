import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Booking from '../pages/Booking.vue'
import LoginForm from '@/components/LoginForm.vue'

const routes = [
  { path: '/', component: LoginForm },
  { path: '/login', component: Login },
  { path: '/booking', component: Booking }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 👇 Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')
  // Nếu đã đăng nhập và cố gắng truy cập trang login → chuyển hướng sang /booking
  if (to.path === '/' && isAuthenticated) {
    next('/booking')
  } else {
    next()
  }
})
export default router