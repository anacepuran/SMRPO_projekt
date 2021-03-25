import Vue from 'vue'
import axios from 'axios'

export default ({ app, store }) => {
  const instance = axios.create({
    baseURL: '',
    withCredentials: false
  })

  Vue.prototype.$axios = instance

  app.axios = instance
  store.$axios = instance
}
