const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

// 开发时依赖的配置文件
module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: './dist',
    inline: true //是否需要进行实时的监听
  }
})