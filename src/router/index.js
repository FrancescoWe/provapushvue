import Vue from 'vue'
//import VueRouter from 'vue-router'
import { IonicVueRouter } from '@ionic/vue';
import Home from '../views/Home.vue'
import HomeMap from '../views/HomeMap.vue'
import TilesVector from '../views/TilesVector.vue'


Vue.use(IonicVueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/homescreen',
    name: 'HomeMap',
    component: HomeMap
  },
  {
    path: '/mytiles',
    name: 'TilesVector',
    component: TilesVector
  }
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
