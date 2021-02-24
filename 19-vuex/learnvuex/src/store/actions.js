/* 
  actions 中专门做一些异步操作！！！
*/

export default {
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('里面完成了提交');
        resolve('1111');
      })
    })
  }
}