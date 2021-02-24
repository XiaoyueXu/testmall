import Vuex from 'vuex'
import Vue from 'vue'
import { INCREMENT } from './mutations-types'

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

// 定义模块
const moduleA = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  // modules: {}
};
const moduleB = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  // modules: {}
}

const store = new Vuex.Store({
  state: {
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
  },
  mutations: {

    /* 修改state的【唯一】途径就是通过 mutations！！！！ */


    // 这里面必须是 同步方法 ！！！
    /*    
      定义一些方法，方法默认会有参数state，
      以下两种定义方式都可行：
      increment(state) {
      ['increment'](state) { 
    */
    [INCREMENT](state) {
      /* 
        事件类型：increment
        回调函数：..(state) {
          ...
        }
      */
      state.counter++
    },
    decrement(state) {
      state.counter--;
    },
    incrementCount(state, count) {
      // 1. 普通的提交风格
      state.counter += count;
    },
    incrementCount2(state, payload) {
      // 2. 特殊的提交风格
      state.counter += payload.count;
    },
    addStudent(state, stu) {
      state.students.push(stu)
    },
    updateInfo(state) {
      // state.info.name = 'codewhy'
      /* 
        如果初始化时没有该属性，用如下方式添加的属性，
        是不会加入到响应式系统中的：
        state.info['address] = '洛杉矶'

        如果要响应式地为info添加/删除属性，则如下形式：
      */
      Vue.set(state.info, 'address', '洛杉矶');
      // Vue.delete(state.info, 'age');

      // 异步操作尝试（×）
      /*       
        setTimeout(() => {
          state.info.name = 'moon'
        }, 2000)
        这时候，devtools调试工具里的内容就会出错
      */
    }
  },
  actions: {
    // 这里专门做一些异步操作
    /* 
      注意，这里的默认输入参数是context。
      context: 上下文,
      payload: 由用户传递的参数
    */
   /* 
    -这种方式不够优雅~
    aUpdateInfo(context, payload) {
      setTimeout(() => {
        context.commit('updateInfo');
        console.log(payload.message.title);
        payload.success();
      }, 2000)
    }
   */
  aUpdateInfo(context, payload) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        console.log('里面完成了提交');
        resolve('1111');
      })
    })
  }
  

  },
  getters: {
    // 相当于计算属性，方法也默认会有参数state
    powerCounter(state) {
      return state.counter * state.counter;
    },
    more20stu(state) {
      return state.students.filter(s => s.age > 20);
    },
    more20stuLength(state, getters) {
      // 可以再增加一个入参，以获取getters属性
      return getters.more20stu.length;
    },
    moreAgeStu(state) {
      // 获取年龄大于age的学生信息，其中age是可变参数
      /* 
        由于age是不确定的，因此返回一个函数，函数的入参由调用者指定值
      */
      return function (age) {
        return state.students.filter(s => s.age > age);
      }
    }
  },
  modules: {
    // 将store里的内容模块化
    a: moduleA,
    b: moduleB
  }
})

// 3. 导出store对象
export default store
