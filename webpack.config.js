const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
    /* 使用 SplitChunksPlugin代替如下操作  -> 可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash', // 在多个 chunk 只引一次这个模块，防止重复
    */
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // runtimeChunk: 'single', // 如果要在一个 HTML 页面上使用多个入口时配置
    splitChunks: {
      chunks: 'all', // 可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
    },
  },
};