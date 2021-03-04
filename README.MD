# 说明

用于快速测试一些类库. 如果直接用html引入类库的方式, 没有代码提示太痛苦了. 想要提示还是需要typescript, 并使用node_modules.

# 参考文档

https://webpack.js.org/guides/getting-started/
https://webpack.js.org/guides/typescript/

# 使用

编译并启动web服务器 npm start
打包构建npm run build
添加依赖 cnpm install xxx --save
如果依赖没有代码提示, 尝试:
cnpm install @types/xxx --save-dev
现在大部分库都自带.d.ts文件, 所以没问题.

# 搭建过程

PS: 安装cnpm, 用cnpm代替npm, 提高速度.

## 安装webpack

``` bash
mkdir webpack-typescript-es6
cd webpack-typescript-es6
npm init -y
npm install webpack webpack-cli --save-dev
```

webpack4 是开箱即用. 不需要配置就可以执行基本的打包了.
使用npx webpack代替npm run webpack, npx可以自动找node_modules下的webpack, 而npm命令会告诉你找不到命令, 除非你全局安装webpack或者手动指定位置./node_modules/.bin/webpack.

## 配置webpack

``` BASH
touch webpack.config.js
```

* 修改配置文件. 配置webpack打包入口entry, 输出位置output. 加载器规则 loader rules, 插件plugins, 解析选项resolve options, 以及其他增强选项.
* webpack执行时, 默认使用webpack.config.js作为配置, 当然你也可以自行指定.

``` BASH
npx webpack --config webpack.config.js
```

* 修改package.json, 在scripts属性中配置build命令.

### webpack配置-web服务器

为了开发方便, 使用webpack的web服务器.

``` BASH
# cnpm install webpack-dev-server --save-dev
cnpm install --save-dev webpack-dev-server@4.0.0-beta.0
```

修改webpack.config.js配置文件. 添加devServer部分.

### 添加webpack插件 html-webpack-plugin

自动为dist目录生成index.html, 并将webpack的bundles引入html. 避免dist清空后手动处理.

``` BASH
npm i --save-dev html-webpack-plugin
```

修改webpack.config.js配置文件. 添加devServer部分.

## 安装typescript

``` BASH
npm install --save-dev typescript ts-loader
```

## 配置typescript

``` BASH
touch tsconfig.json
```

* 配置tsconfig.json

## ts与webpack集成.

修改webpack.config.js, 加入module, resolve等配置.
注意ts-loader使用tsc来编译, 同时tsconfig.json中module不要设置成CommonJS, 否则webpack无法使用tree-shake.

### 启用sourceMap

1. tsconfig.json中启用sourceMap,让ts输出内联的sourceMap.
2. 配置webpack,告知其抽取sourceMap,包含在最终的bundlue中.

# 加入基础项目骨架.

* 添加index.html, 与src目录

* 注意根目录的index.html与dist下index.html有些许区别.

# 如何在.ts文件引入typescript不支持的文件类型.

* 自行声明.d.ts文件.

如: 需要import svg文件, 则在根目录新建一个svg.d.ts文件

``` js
declare module '*.svg' {
    const content: any;
    export default content;
}
```

* 去npm仓库找对应的loader, 然后再声明.d.ts文件.
* 本脚手架, 在typings.d.ts中统一添加相关的声明.

# webpack配置文件中, vscode怎么代码提示?

https://blog.csdn.net/zsy_snake/article/details/107072349
使用JSDoc的方式进行代码提示.

# 报错:

* 在控制台输入npm run dev，控制台里报错“‘webpack’不是内部或外部命令，也不是可运行的程序或批处理文件

将项目里的“node_modules”文件夹删除，然后在项目目录，依次运行命令：npm install和npm run dev run dev后项目成功运行。

* 执行npx webpack-dev-server, 报错:

Error: Cannot find module 'webpack-cli/bin/config-yargs'
原因:webpack, webpack-cli 与dev-webpack-server 不兼容.

    "webpack": "^5.24.3",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^3.11.2"

https://www.cnblogs.com/xiaorong-9/p/14069684.html
解决: 使用webpack serve --open命令代替npx webpack-dev-server
或者换用webpack-dev-server 4.0, 兼容webpack@5, webpack-cli@4
