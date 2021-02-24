import Vue from 'vue'
import App from './App'
import router from './router/index'

Vue.config.productionTip = false

// 通过在 Vue.prototype，往 Vue 的原型上添加方法或属性，则所有组件都会有该方法或属性
Vue.prototype.test = function() {
  console.log('test方法');
}
Vue.prototype.name = "codewhy";

// 项目的入口导入了App.vue，因此打开项目时，会显示App.vue
new Vue({
  el: '#app',
  // router: router,
  router, //简写方式
  render: h => h(App)
})

// console.log(router);
