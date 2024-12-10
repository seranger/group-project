import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import LoginComp from '@/components/LoginComp.vue'
import Employee from '@/components/Employee.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView
  },

  {
    path: '/',
    name: 'Login',
    component: LoginComp
  },
  {
    path: '/',
    name: 'Employee',
    component: Employee
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
