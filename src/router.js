import Vue from 'vue'
import Router from 'vue-router'


import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "inicio" */ './views/Inicio.vue'),
      meta: { 
        requiresAuth: true
      }
    }, 
    {
      path: '/indicadores',
      name: 'indicadores',
      component: () => import(/* webpackChunkName: "indicadores" */ './views/Indicador.vue')
    }, 
    {
      path: '/indicador/I01',
      name: 'IO1',
      component: () => import(/* webpackChunkName: "indicadores" */ './views/Indicadores/I01')
    }, 
    {
      path: '/indicador/I02',
      name: 'IO2',
      component: () => import(/* webpackChunkName: "indicadores" */ './views/Indicadores/I02')
    }
  ]
})
