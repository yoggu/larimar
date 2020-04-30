import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '../views/StartScreen.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue')
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
