import axios from 'axios'

export function request(config) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    });

    // 发送网络请求
    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}