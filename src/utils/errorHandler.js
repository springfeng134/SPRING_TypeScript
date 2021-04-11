import Vue from 'vue'
import store from '../store'

Vue.config.errorHandler = function (err, vm, info) {
  store.dispatch('application/setErrorLog', {
    err,
    vm,
    info,
    url: window.location.href
  })
  console.error(err, info)
}
