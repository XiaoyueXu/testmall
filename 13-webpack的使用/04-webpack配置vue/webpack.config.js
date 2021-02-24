const path = require('path');

// 配置文件
module.exports = {
  entry: './src/main.js',
  output: {
    // 动态获取路径
    // resolve 对两个路径进行拼接
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 但凡涉及url，均会在路径前面加指定前缀
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // css-loader只负责将css文件进行加载，不负责解析
        // style-loader负责将样式添加到DOM中
        // 使用多个loader时，是从右向左
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,//图片的限制大小！！报错的话就改大！！！
              // name属性：规定图片打包后的名称规范
              //  其中，img 为打包到 img 文件夹下，
              //       [name] 为取被打包图片的原名，
              //       [hash] 为生成的哈希值，[hash:8] 表示只生成8位哈希值
              //       [ext] 为图片的扩展名
              name: 'img/[name].[hash:8].[ext]'
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ],
  },
  resolve: {
    // 如果路径中的扩展名不想写，就在这里配置 extensions
    extensions: ['.js', '.css', '.vue'],
    alias: { //别名
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
}