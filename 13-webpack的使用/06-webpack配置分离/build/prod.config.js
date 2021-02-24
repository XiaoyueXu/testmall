const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

// 生产时依赖的配置文件
module.exports = webpackMerge(baseConfig, {
  plugins: [
    new UglifyjsWebpackPlugin() //开发阶段不建议丑化，发布阶段才需要
  ],
})


