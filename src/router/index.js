import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/WelcomeView.vue'
import Employee from '@/views/eLoginView.vue'
import Admin from '@/components/Admin.vue'
import Home from '@/components/Home.vue'
import WorkersView from '@/views/WorkersView.vue'


const routes = [
  {
    path: '/welcomeView',
    name: 'WelcomeView',
    component: Welcome
  },
  {
    path: '/eLoginView',
    name: 'eLoginView',
    component: Employee
  },
  {
    path: '/aLoginView',
    name: 'aLoginView',
    component: Admin
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: Home
  },
  {
    path: '/WorkersView',
    name: 'WorkersView',
    component: WorkersView

  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
