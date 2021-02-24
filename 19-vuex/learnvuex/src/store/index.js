import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'

/* 
  这里是单例模式，因此：
  不要定义多个store对象[store1, store2...之类的]，
  而只要一个store数据源。就是说，将所有需要管理的信息，
  统一放到 一个 store对象里面。
*/

// 1. 安装插件
/* 
  一旦安装插件，底层就会执行install方法
*/
Vue.use(Vuex);

// 2. 创建对象
const state = {
  counter: 1000,
  students: [
    { id: 110, name: 'why', age: 18 },
    { id: 111, name: 'kobe', age: 24 },
    { id: 112, name: 'james', age: 30 },
    { id: 113, name: 'curry', age: 10 }
  ],
  info: {
    name: 'kobe',
    age: 40,
    height: 1.98
  }
};

const store = new Vuex.Store({
  // state: state,
  // mutations: mutations,
  // actions: actions,
  // getters: getters,

  // ES6写法
  state,
  mutations,
  actions,
  getters,
  modules: {
    // 将store里的内容模块化
    a: moduleA,
    b: moduleB
  }
})

// 3. 导出store对象
export default store
