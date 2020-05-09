import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import login from '@/views/login.vue'
import print from '@/views/print.vue'
import admin from '@/views/admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/login ',
    name: 'Login',
    component: login
  },
  {
    path: '/print ',
    name: 'Print',
    component: print
  },
  {
    path: '/admin ',
    name: 'Admin',
    component: admin
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
