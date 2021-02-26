import Vue from 'vue'
import axios from 'axios'

export default ({ app, store }) => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
    withCredentials: false
  })

  Vue.prototype.$axios = instance

  app.axios = instance
  store.$axios = instance
}
