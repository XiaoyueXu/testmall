/* 
  getters 相当于计算属性，方法也默认会有参数state
*/

export default {
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
}