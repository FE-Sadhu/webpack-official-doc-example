const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist', // 将 dist 目录下的文件 serve 到 localhost:8080 下
    hot: true, // 开启模块热更新，也就是当仅是某个模块的代码改变时，不用刷新整个页面（否则会刷新），只改变模块相关渲染
    hotOnly: false, // true -> 控制当模块热更新失败时，不刷新整个页面
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 每次构建前清理 /dist 文件夹，这样只会生成用到的文件
    publicPath: '/', // 以确保文件资源能够正确地 serve 在 http://localhost:3000 -> node server 的情况
  },
};