<font face="微软雅黑" size="2">

## Vue 单文件组件
- [Vue 单文件组件](#vue-单文件组件)
  - [1. 传统组件的问题和解决方案](#1-传统组件的问题和解决方案)
    - [1.1 问题](#11-问题)
    - [1.2 解决方案](#12-解决方案)
  - [2. Vue 单文件组件的基本用法](#2-vue-单文件组件的基本用法)
  - [3. webpack 中配置 vue 组件的加载器](#3-webpack-中配置-vue-组件的加载器)
  - [4. 在webpack 项目中使用 vue](#4-在webpack-项目中使用-vue)
  - [5. webpack 打包发布](#5-webpack-打包发布)
### 1. 传统组件的问题和解决方案
#### 1.1 问题
1. 全局定义的组件必须保证组件的名称不重复
2. 字符串模板缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的\
3. 不支持 CSS 意味着当 HTML 和 JavaScript 组件化时， CSS明显被遗漏
4. 没有构建步骤限制，只能使用HTML 和 ES5 JavaScript，而不能使用预处理器（如：Babel）

#### 1.2 解决方案
针对传统组件的问题，Vue 提供了一个解决方案--使用Vue单文件组件。

### 2. Vue 单文件组件的基本用法

单文件组件的组成结构
- template 组件的模板区域
- script 业务逻辑区域
- style 样式区域

### 3. webpack 中配置 vue 组件的加载器
1. 运行 **npm install vue-loader vue-template-compiler -D** 命令
2. 在 webpack.config.js 配置文件中，添加vue-loader 的配置项如下：
   ```js
   const VueLoaderPlugin = require('vue-loader/lib/plugin')

   module.exports = {
     module: {
       rules: [
         //...其他规则
         {
           test:/\.vue$/,
           loader: 'vue-loader'
         }
       ]
     },
     plugins: [
       //...其他插件
       new VueLoaderPlugin()  //确保引入这个插件！
     ]
   }
   ```
### 4. 在webpack 项目中使用 vue
1. 运行 npm i vue -S 安装 vue
2. 在 src => index.js 入口文件中，通过 **import Vue from 'vue'** 来导入 vue 构造函数
3. 创建 vue 的实例对象，并指定要控制的 el 区域
4. 通过 render 函数渲染 App 根组件
   ```js
   //1. 导入 Vue 构造函数
   import Vue from 'vue'
   //2. 导入 App 根组件
   import App from './components/App.vue'

   const vm = new Vue({
     //3. 指定 vm 实例要控制的页面区域
     el: "#app",
     //4. 通过 render 函数，把指定的组件渲染到 el 区域中
     render: h => h(App)  
   })

   ```
### 5. webpack 打包发布
上线之前需要通过webpack将应用进行整体打包，可以通过 packages.json 文件配置打包命令：
```js
//在 packag.json 文件中配置 webpack 打包命令
//该命令默认加载项目根目录中的 webpack.config.js 配置文件
"Scripts": {
  "build": "webpack -p" 
}
```