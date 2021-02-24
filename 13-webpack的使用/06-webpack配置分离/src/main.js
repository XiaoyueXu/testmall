// 1. 使用 commonJS 的模块化
const { add, mul } = require('./js/mathUtils')

console.log(add(20, 30));
console.log(mul(20, 30));

// 2. 使用 ES6 的模块化的规范
import { age, name } from './js/info.js';

console.log(age);
console.log(name);

// 3. 依赖css文件
require('./css/normal.css')

// 4. 依赖less文件
require('./css/special.less')
document.writeln('<h2>你好啊，李银河！</h2>')

// 5. 使用 Vue 进行开发
import Vue from 'vue'
// import App from './vue/app'
import App from './vue/App.vue'

const app = new Vue({
  el: '#app',
  // vue 编译的时候，会把 template 的东西自动挂载（复制）到 el 指定的元素内部
  template: '<App/>',
  components: {
    App
  }
})

document.writeln('<span>哈哈哈</span>')