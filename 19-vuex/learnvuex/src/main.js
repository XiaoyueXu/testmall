import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, // 将store对象挂载到new Vue对象中，这样可以保证在所有的组件中都可以使用到
  router,
  render: h => h(App)
})
