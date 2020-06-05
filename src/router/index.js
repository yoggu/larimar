import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '../views/StartScreen.vue'
import Menu from '../views/Menu.vue'
import Game from '../views/Game.vue'

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
    component: Menu
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
    component: Game
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
