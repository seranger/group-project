import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Employee from '@/components/Employee.vue'
import Admin from '@/components/Admin.vue'
import Home from '@/components/Home.vue'
import SidebarLayout from '@/components/SidebarLayout.vue'
import WorkersView from '@/views/WorkersView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'


const routes = [
  {
    path: '/SidebarLayout',
    component: SidebarLayout,
    children: [
      { path: '/WorkersView', component: WorkersView },
      { path: '/HomeView', component: HomeView },
      { path: '/', component: Welcome },
    ],
  },
  {
    path: '/welcomeView',
    name: 'WelcomeView',
    component: Welcome
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: Employee
  },
  {
    path: '/LoginView',
    name: 'LoginView',
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

  },
  {
    path: '/ProfileView',
    name: 'ProfileView',
    component: ProfileView

  }
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
