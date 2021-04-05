const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 每次构建前清理 /dist 文件夹，这样只会生成用到的文件
  },
  optimization: {
    // (webpack 5 内置了)
    moduleIds: 'deterministic', // 目的是为了改变(增加/删除)模块的引入(import)时，不会影响到第三方库的 vendor chunk 文件的内容 hash 值
    // (webpack 5 内置了)不拆分 runtime webpack 代码的话，每次打包后的 bundle 的 contenthash 值都会变，尽管文件内容没变
    // 将 webpack 自己的 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: { // 这里的配置是将代码中使用到的第三方库提取到单独的 vendor chunk 文件中，因为这些第三方库的代码不容易变化，当再次构建时，大概率不会变，则可以命中 client 强缓存机制
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }, 
  },

};