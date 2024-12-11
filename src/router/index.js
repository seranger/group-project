import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import eLoginView from '@/views/eLoginView.vue'


const routes = [
  {
    path: '/Welcome',
    name: 'WelcomeView',
    component: WelcomeView
  },
  {
    path: '/Employee',
    name: 'eLoginView',
    component: eLoginView
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
