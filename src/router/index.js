import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Employee from '@/components/Employee.vue'
import Admin from '@/components/Admin.vue'
import Home from '@/components/Home.vue'
import SidebarLayout from '@/components/SidebarLayout.vue'
import WorkersView from '@/views/Workers.vue'
import ProfileView from '@/views/Profile.vue'
import RequestView from '@/views/Request.vue'


const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/sidebarLayout',
    component: SidebarLayout,
    children: [
      { path: '/workersview', component: WorkersView },
      { path: '/home', component: Home },
      { path: '/requestview', component: RequestView },
    ],
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/workers',
    name: 'Workersview',
    component: WorkersView

  },
  {
    path: '/request',
    name: 'Requestview',
    component: RequestView

  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/profile',
    name: 'Profileview',
    component: ProfileView

  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
