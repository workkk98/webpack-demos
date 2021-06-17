# externals

externals对象可以让用户来指定排除bundle中的某些依赖。

### 最基本的root（通过全局变量）

用户提供key，webpack在打包的时候，确认哪些依赖是该排除的。之后根据用户提供的value来获取global对象上的变量。

例如:
```js
module.exports = {
  externals: {
    jquery: '$'
  }
}

// bundle中依赖了'jquery'这个key的, 就获取全局global.$变量。
import $ from 'jquery'

// 还有一种string[]的形式，写法有点小区别，但本质上还是获取global对象上的Math.floor
subtract: ['Math', 'floor'],
```

### 除了root以外还有commonjs、commonjs2、amd等libraryTarget

```js
{
  externals: {
    'fs-extra': 'commonjs2 fs-extra',
  }
}
```

例如libraryTarget/dist/index.cmd2.js
这些估计是给node打包用的，不用去关注。

### 像umd类的包

```js

// 此语法用于描述外部 library 所有可用的访问方式

{
  externals: {
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_' // 指向全局变量
    }
  }
}
```

### 函数（稍微了解下）

对于 webpack 外部化，通过定义函数来控制行为，可能会很有帮助。例如，webpack-node-externals 能够排除 node_modules 目录中所有模块，还提供一些选项，比如白名单 package(whitelist package)。

函数接收两个入参：

ctx (object)：包含文件详情的对象。
ctx.context (string): 包含引用的文件目录。
ctc.request (string): 被请求引入的路径。
ctx.contextInfo (string): 包含 issuer 的信息（如，layer）
ctx.getResolve 5.15.0+: 获取当前解析器选项的解析函数。
callback (function (err, result, type)): 用于指明模块如何被外部化的回调函数
回调函数接收三个入参：

err (Error): 被用于表明在外部外引用的时候是否会产生错误。如果有错误，这将会是唯一被用到的参数。
result (string [string] object): 描述外部化的模块。可以接受形如 ${type} ${path} 格式的字符串，或者其它标准化外部化模块格式，(string, [string]，或 object)。
type (string): 可选的参数，用于指明模块的类型（如果它没在 result 参数中被指明）。

```js
  function ({ context, request }, callback) {
    if (/^yourregex$/.test(request)){
      // 使用 request 路径，将一个 commonjs 模块外部化
      return callback(null, 'commonjs ' + request);
    }

    // 继续下一步且不外部化引用
    callback();
  }
```


### 关于commonjs的一篇issue

[what is commonjs2](https://github.com/webpack/webpack/issues/1114)

其实大致上就是讲，commonjs2就是有module.exports的这个东东。commonjs规范只定义了exports。