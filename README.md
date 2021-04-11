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

#### 补充说明
代码分割一般就两种情况：

###### 分割自己写的模块
有 a.js b.js common.js 三个文件，若 a、b 都引入了 common.js 的方法。

若仅配置 splitChunksPlugin 去让 webpack 自动分割的话，分割不出来。

这种情况必须使用 ***动态导入*** 才能分割出来。

###### 分割第三方模块
如引入 lodash，这种情况直接配置 splitChunksPlugin ```splitChunks: {chunks: 'all'}``` 去让 webpack 自动分割就行。

也可以使用 `caching` 那章，配置 splitChunksPlugin 的参数，分割所有第三方模块为一个 chunk。
```js
cacheGroups: { // 这里的配置是将代码中使用到的第三方库提取到单独的 vendor chunk 文件中，因为这些第三方库的代码不容易变化，当再次构建时，大概率不会变，则可以命中 client 强缓存机制
  vendor: {
    test: /[\\/]node_modules[\\/]/,
    name: 'vendors',
    chunks: 'all',
  },
},
```