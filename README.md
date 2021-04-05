代码分割三种方式：
1. 入口起点：使用 entry 配置手动地分离代码。
2. 防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
3. 动态导入：通过模块的内联函数调用来分离代码。

#### 入口起点的隐患
1. 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
2. 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

#### 动态引入
使用 ES 提案的 `import()` 语法

#### bundle 分析
[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)