const path = require('path');

module.exports = {
  mode: 'development', // 手动配置为 production 时，默认打包后 tree shaking 掉未引用的代码且压缩、混淆
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 假如有副作用，需要在 package.json 的 sideEffects 字段中加入，那么 Tree Shaking 就不会对它们生效。 比如 babel-polyfill 或 import 的
  // css 文件。 你直接 Import 就行了，没有使用导出。 那么若没在 sideEffects 字段中加入，Tree Shaking 就会把它们去掉。
  // 而且 sideEffects 字段 无论 开发环境 还是 线上环境 都要配置上。
  // optimization: { 开发环境下为没有引用到的、且没有副作用的代码打上标记  
  //   usedExports: true,
  // },
};