import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Booking from '../pages/Booking.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/booking', component: Booking }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router