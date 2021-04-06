const {
  merge
} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist', // 将 dist 目录下的文件 serve 到 localhost:8080 下
    hot: true, // 开启模块热更新，也就是当仅是某个模块的代码改变时，不用刷新整个页面（否则会刷新），只改变模块相关渲染
    hotOnly: false, // true -> 控制当模块热更新失败时，不刷新整个页面
  },
});