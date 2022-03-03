import { createRouter, createWebHistory } from 'vue-router'
//import Registration from '../'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: ()=> import('../views/login.vue')
    },
    {
      path:"/signup",
      name:'signup',
      component: () =>import('../views/Registration.vue')
    },
    {
      path:"/dashboard",
      name:'dashboard',
      component: () => import('../views/dashboard.vue')

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
