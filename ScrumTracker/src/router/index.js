import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notify } from 'quasar'

import routes from './routes'
// import store from './store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  // initialise state
  // store.commit('init')

  Router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      if (store.state.user.currentUser) {
        if (to.meta.requiresAdmin) {
          if (
            store.state.user.currentUser.permissions &&
            store.state.user.currentUser.permissions === 'Admin'
          ) {
            next()
          } else {
            Notify.create({
              message: 'Your account is not authorized to see this page.',
              color: 'negative'
            })
            next('/home')
          }
        } else if (
          to.path === '/'
        ) {
          next('/home')
        } else if (to.path !== '/') {
          next()
        } else {
          next()
        }
      } else {
        if (to.path !== '/') {
          next('/')
        } else {
          next()
        }
      }
    } else {
      next()
    }
  })

  return Router
}
