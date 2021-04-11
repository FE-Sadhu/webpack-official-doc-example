https://webpack.docschina.org/guides/getting-started/

1. tree shaking 支持 ES Module 引入的模块，因为工作在静态分析阶段。

2. 去除死代码的是 uglify (DCE) 如 return 后面的代码， 去除无使用代码的才是 Tree Shaking

参考: [Tree-Shaking性能优化实践 - 原理篇](https://juejin.cn/post/6844903544756109319)