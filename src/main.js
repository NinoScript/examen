import Vue from 'vue'
import App from './App'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
var mock = new MockAdapter(axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
window.Vue = Vue
window.axios = axios
window.mock = mock
window.app = new Vue({
  el: '#app',
  render: h => h(App)
})
