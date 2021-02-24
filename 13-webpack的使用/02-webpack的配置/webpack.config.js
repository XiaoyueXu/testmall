const path = require('path');

// 配置文件
module.exports = {
  entry: './src/main.js',
  output: {
    // 动态获取路径
    // resolve 对两个路径进行拼接
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}