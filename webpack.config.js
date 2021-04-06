const path = require('path');

module.exports = {
  mode: 'development', // 手动配置为 production 时，默认打包后 tree shaking 掉未引用的代码且压缩、混淆
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // optimization: { 开发环境下为没有引用到的、且没有副作用的代码打上标记  // 假如有副作用，需要在 package.json 的 sideEffects 字段中加入
  //   usedExports: true,
  // },
};