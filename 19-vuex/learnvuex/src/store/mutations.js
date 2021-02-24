/* 
  mutations：修改state的【唯一】途径！！！！
  mutations 里的方法必须是 同步方法 ！！！
*/

import { INCREMENT } from './mutations-types'
export default {
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
}