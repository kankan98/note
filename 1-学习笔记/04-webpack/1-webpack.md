<font face="微软雅黑" size="2">

## webpack
- [webpack](#webpack)
  - [1. webpack概述](#1-webpack概述)
  - [2. webpack的基本使用](#2-webpack的基本使用)
    - [2.1 创建项目](#21-创建项目)
    - [2.2 在项目中安装和配置webpack](#22-在项目中安装和配置webpack)
    - [2.3 配置打包的入口与出口](#23-配置打包的入口与出口)
    - [2.4 配置webpack的自动打包功能](#24-配置webpack的自动打包功能)
    - [2.5 配置 html-webpack-plugin 生成预览页面](#25-配置-html-webpack-plugin-生成预览页面)
    - [2.6 配置自动打包相关的参数](#26-配置自动打包相关的参数)
  - [3. webpack 中的加载器](#3-webpack-中的加载器)
    - [3.1 通过 loader 打包非js模块](#31-通过-loader-打包非js模块)
  - [4. webpack 中加载器的基本使用](#4-webpack-中加载器的基本使用)
    - [4.1 打包处理 css 文件](#41-打包处理-css-文件)
    - [4.2 打包处理 less 文件](#42-打包处理-less-文件)
    - [4.3 打包处理 sass 文件](#43-打包处理-sass-文件)
    - [4.4 配置postCSS 自动添加 css 的兼容前缀](#44-配置postcss-自动添加-css-的兼容前缀)
    - [4.5 合并以上配置](#45-合并以上配置)
    - [4.6 打包样式表中的图片和字体文件](#46-打包样式表中的图片和字体文件)
    - [4.7 打包处理js文件中的高级语法](#47-打包处理js文件中的高级语法)
### 1. webpack概述
**webpack**是一个流行的**前端项目构建工具（打包工具）**，可以解决当前web开发中所面临的困境。

webpack提供了**友好的模块化支持**，以及**代码压缩混淆、处理js兼容性问题、性能优化**等强大的功能，从而让程序员把工作重心放到具体的功能实现上，提高了开发效率和项目的可维护性。

### 2. webpack的基本使用
#### 2.1 创建项目
1. 新建项目空白目录，运行**npm init -y**命令：初始化包管理配置文件 package.json
2. 新建src源代码目录
3. 新建src -> index.html 首页
4. 初始化首页基本的结构
5. 运行npm install jquery -S命令，安装jQuery
6. 通过模块化的形式，实现列表隔行变色效果

#### 2.2 在项目中安装和配置webpack
1. 运行 **npm install webpack webpack-cli -D** 命令，安装webpack相关的包
2. 在项目根目录中，创建名为**webpack.config.js** 的 webpack 配置文件
3. 在webpack的配置文件中初始化如下基本配置：
   ```js
    module.exports = {
      mode: 'development'  //mode用来指定构建模式
    }
   ```
4. 在 package.json 配置文件中的 scripts 节点下，新增 dev 脚本如下：
   ```js
   "scripts":{
     "dev": "webpack"   //script节点下的脚本，可以通过npm run 执行
   }
   
   ```
5. 在终端运行 **npm run dev** 命令，启动 webpack 进行项目打包。

#### 2.3 配置打包的入口与出口
webpack的4.x版本中默认约定：
- 打包的入口文件为： src -> index.js
- 打包的输出文件为 dist -> main.js
  
  **修改打包的入口和出口的配置信息：**
  ```js
  const path = require('path')    //导入node.js中专门操作路径的模块

  module.exports = {
    entry: path.join(__dirname, './src/index.js'),  //打包入口文件的路径
    output: {
      path: path.join(__dirname, './dist'),  //输出文件的的存放路径
      fileame: 'bundle.js'  //输出文件的名称
    }
  }
  ```

#### 2.4 配置webpack的自动打包功能
1. 运行 **npm install webpack-dev-server -D** 命令，安装支持项目自动打包的工具
2. 修改 package.json -> scripts 中的 dev 命令如下：
   ```js
   "scripts":{
     "dev": "webpack-dev-server"   //script 节点下的脚本，可以通过npm run执行
   }
   ```
3. 将 src -> index.html 中的 script脚本的引用路径修改为 "/bundle.js"
4. 运行 npm run dev 命令，重新进行打包
5. 在浏览器中访问 http://localhost:8080 地址，查看自动打包效果

#### 2.5 配置 html-webpack-plugin 生成预览页面
1. 运行 **npm install html-webpack-plugin -D** 命令，安装生成预览页面的插件
2. 修改 webpack.config.js 文件头部区域，添加如下配置信息：
   ```js
   //导入生成预览页面插件，得到一个构造函数
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const htmlPlugin = new HtmlWebpackPlugin({   //创建插件的实例对象
     template: './src/index.html',    //指定要用到的模板文件
     filename: 'index.html'   //指定生成的文件的名称，该文件存在于内存中，在目录中不显示
   })
   ```
3. 修改 webpack.config.js 文件中向外暴露的配置对象，新增如下配置节点：
   ```js
   module.exports = {
     plugins: [ htmlPlugin ]    //plugins 数组是 webpack 打包期间会用到的一些插件列表
   }
   ```
#### 2.6 配置自动打包相关的参数
```js
// package.json中的配置
// --open 打包完成后自动打开浏览器页面
// --host 配置 IP 地址
// --port 配置端口
"scripts": {
  "dev": "webpack-dev-server --open --host 127.0.0.1 --port 8080"
}
```

### 3. webpack 中的加载器
#### 3.1 通过 loader 打包非js模块
> 在实际开发过程中，webpack 默认只能打包处理以 .js 后缀名结尾的模块，其他非 .js后缀名结尾的模块， webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则会报错！

loader 加载器可以协助 webpack 打包处理特定的文件模块，比如：
- less-loader 可以打包处理 .less 相关的文件
- sass-loader 可以打包处理 .scss 相关的文件
- url-loader  可以打包处理 css 中与 url 路径相关的文件

### 4. webpack 中加载器的基本使用
- CSS
- LESS
- SCSS
- PostCSS
- JavaScript
- Image/Font
- Vue
> 注意：考虑兼容性,以便能够在不同浏览器中打包非js模块的文件，需要在package.json添加 **browserslist**
```js
  "browserslist": [
    "last 2 version",
    "> 1%",
  ]
```
#### 4.1 打包处理 css 文件
1. 运行 **npm i style-loader css-loader -D** 命令，安装处理css文件的loader
2. 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
   ```js
   //所有第三方文件模块的匹配规则
   module:{
     rules:[
       { test: /\.css$/, use: ['style-loader', 'css-loader'] }
     ]
   }
   ```
   其中，**test**表示匹配的文件类型，**use**表示对应要调用的loader

#### 4.2 打包处理 less 文件
1. 运行 **npm i less-loader less -D** 命令，安装处理css文件的loader
2. 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
   ```js
   module:{
     rules:[
       { test: /\.less$/, use: ['style-loader', 'css-loader','less-loader'] }
     ]
   }
   ```
#### 4.3 打包处理 sass 文件
1. 运行 **npm i sass-loader node-sass -D** 命令，安装处理css文件的loader
2. 在 webpack.config.js 的 module -> rules  数组中，添加 loader 规则如下：
   ```js
   module:{
     rules:[
       { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
     ]
   }
   ```

#### 4.4 配置postCSS 自动添加 css 的兼容前缀 
1. 运行 **npm i postcss-loader autoprefixer -D** 命令
2. 在项目根目录中创建 postcss 的配置文件 **postcss.config.js**, 并初始化如下配置：
   ```js
   const autoprefixer = require('autoprefixer')   //导入自动添加前缀的插件
   module.exports = {
     plugins: [ autoprefixer ]    //挂载插件
   }
   ```
3. 在 webpack.config.js 的 module -> rules 数组中，**修改 css 的 loader** 规则如下：
   ```js
   module: {  
     rules: [
       { test:/\.css$/,use: ['style-loader', 'css-loader', 'postcss-loader'] }
     ]
   }
   ```
#### 4.5 合并以上配置
```js
module: {
  rules: [
    { 
      test: /\.css|\.less|\.scss$/, 
      use: ['style-loader', 'css-loader','postcss-loader','less-loader','sass-loader'] 
    }
  ],
}
```
#### 4.6 打包样式表中的图片和字体文件
1. 运行 **npm url-loader file-loader -D** 命令
2. 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
   ```js
   module: {
     rules: [
       {
         test: /\.jpg|gif|png|bmp|tf|eot|svg|woff|woff2$/,
         use: 'url-loader?limit=16940'
       }
     ]
   }
   ```
   其中？之后是loader的参数项。
   limit 用来指定图片的大小，单位是字节（byte），只有小于 limit 大小的图片，才会被转成base64 的图片 

#### 4.7 打包处理js文件中的高级语法
1. 安装babel转换器相关的包：**npm install babel-loader @babel/core @babel/runtime -D**
2. 安装 babel 语法插件相关的包：**npm install @babel/preset-env @babel/plugin-transform-runtime 2babel/plugin-proposal-class-properties -D**
3. 在项目根目录中，创建 babel 配置文件 babel.config.js 并初始化基本配置如下：
   ```js
   module.exports = {
     presets: [ '@babel/preset-env' ],
     plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
   }
   ```
4. 在webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
   ```js
   //exclude 为排除项，表示 babel-loader 不需要处理 node_modules 中的 js 文件
   {
     test: /\.js$/,
     use: 'babel-loader', exclude: /node_modules/
   }
   ```


