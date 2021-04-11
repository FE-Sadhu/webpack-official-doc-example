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

~~若仅配置 splitChunksPlugin 去让 webpack 自动分割的话，分割不出来。~~

这种情况必须使用 ***动态导入*** 才能分割出来。

> 分割不出来的原因是因为 splitChunksPlugin 的默认配置，具体配置代表什么意思查看本文档最后，或官网。

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

#### splitChunksPlugin 默认配置
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // async 只识别动态引入的分割方式，识别不了同步引入。 'all' 的话就都可以识别
      minSize: 20000, // 只有当引入的模块大小至少大于 20kb 时，才作分割
      minRemainingSize: 0, // 拆分后剩余的最小 chunk 的大小至少大于 0
      minChunks: 1, // 模块最小引入过 1 次，才会分割
      maxAsyncRequests: 30, // 拆分数量最多为 30
      maxInitialRequests: 30, // 首屏渲染能加载的最多 chunk 数量为 30
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 引入 node_modules 的模块都会被拆分成 defaultVendors 同一个文件
          priority: -10, // 符合 cacheGroups 多个 group 条件的模块，以这个为优先级以示应用哪个 group 的条件拆分
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块。
          // 比如 index.js 引入了 a.js、b.js，但其实 a.js 里引入了 b.js，所以拆分 a.js 的 chunk 后，其他文件再引入 b.js 就不会被拆分了，因为已经拆分了的 a.js 包含了 b.js。
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 比如 index.js 引入了 a.js、b.js，但其实 a.js 里引入了 b.js，所以拆分 a.js 的 chunk 后，其他文件再引入 b.js 就不会被拆分了，因为已经拆分了的 a.js 的 chunk 包含了 b.js。
        },
      },
    },
  },
};

```