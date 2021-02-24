import axios from 'axios'

export function request(config) {
  /* 1. 创建axios的实例 */
  // 这里的instance就是Promise类型
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  /* 2. axios的拦截器 */
  // 全局拦截：axios.interceptors
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config, '拦截了...');
    // 1. config中的一些信息不符合服务器的要求

    // 2. 每次发送网络请求时，都希望在界面中显示一个请求图标

    // 3. 某些网络请求(比如登录(token))，必须携带一些特殊的信息

    // 拦截了之后，还需要返回
    return config;
  }, err => {
    // console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
  }, err => {
    console.log(err);
  })

  return instance(config)
}