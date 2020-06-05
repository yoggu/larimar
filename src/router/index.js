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
    component: '../views/Menu.vue'
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import(/* webpackChunkName: "result" */ '../views/Result.vue')
  },
  {
    path: '/credits',
    name: 'Credits',
    component: () => import(/* webpackChunkName: "credits" */ '../views/Credits.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: '../views/Game.vue'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
