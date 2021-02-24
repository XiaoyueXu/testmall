import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// // 0. 使用全局的axios和对应的配置进行网络请求
// axios.defaults.baseURL = 'http://152.136.185.210:7878/api/m5';
// axios.defaults.timeout = 5000;

// // 1. axios的基本使用
// axios({
//   url: '/home/multidata',
//   method: 'get'
// }).then(res => {
//   console.log(res, 'res...');
// })

// axios({
//   url: '/home/data',
//   // 专门针对get请求的参数拼接
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   // console.log(res, 'res...');
// })

// // 2. axios发送并发请求
// axios.all([
//   axios({
//     url: '/home/data',
//     params: {
//       type: 'sell',
//       page: 4
//     }
//   }),
//   axios({
//     url: '/home/multidata'
//   })
// ])
// // 2.1 将两次请求的结果都放到results中
// .then(results => {
//   // console.log(results, 'results...');
// })

// 2.2 将两次请求的结果展开
// .then(axios.spread((res1, res2) => {
//   console.log(res1, 'res1...');
//   console.log(res2, 'res2...');
// }))

// 4. 创建axios的实例
// const instance1 = axios.create({
//   baseURL: 'http://152.136.185.210:7878/api/m5',
//   timeout: 5000
// });

// instance1({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res, 'res...');
// })

// instance1({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res, 'res2...');
// })

// const instance2 = axios.create({
//   baseURL: '...',
//   timeout: 5000
// });

// instance2({
//   url: '...',
//   headers: {

//   },
// }).then(res => {
//   // ...
// })

// 5. 封装一个request模块

import {requestCallback} from './network/requestCallback';
/* 
  1) 传入回调函数的方式
  requestCallback({
    url: '/home/multidata',
  }, res => {
    console.log(res);
  }, err => {
    console.log(err);
  })
*/
/* 
  2) 也并非最终方案
  import {request} from './network/request';
  request({
    baseConfig: {
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    },
    success: function (res) {
      console.log(res, 'seccess...');
    },
    failure: function (err) {
      console.log(err, 'err...');
    }
  })
 */

  // 3) 4) 采用Promise的方案
  import {request} from './network/request';
  request({
    url: '/home/multidata',
  }).then(res => {
    console.log(res, '成功...');
  }).catch(err => {
    // console.log(err, '失败...');
  })
