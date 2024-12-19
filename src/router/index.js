import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Employee from '@/components/Employee.vue'
import Admin from '@/components/Admin.vue'
import Home from '@/components/Home.vue'
import SidebarLayout from '@/components/SidebarLayout.vue'
import WorkersView from '@/views/WorkersView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RequestView from '@/views/RequestView.vue'
import AboutCom from '@/components/AboutCom.vue'


const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/SidebarLayout',
    component: SidebarLayout,
    children: [
      { path: '/WorkersView', component: WorkersView },
      { path: '/Home', component: Home },
      { path: '/RequestView', component: RequestView },
      { path: '/AboutCom', component: AboutCom },
    ],
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/WorkersView',
    name: 'WorkersView',
    component: WorkersView

  },
  {
    path: '/RequestView',
    name: 'RequestView',
    component: RequestView

  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/Employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/ProfileView',
    name: 'ProfileView',
    component: ProfileView

  },
  {
    path: '/AboutCom',
    name: 'AboutCom',
    component: AboutCom

  },
  
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
