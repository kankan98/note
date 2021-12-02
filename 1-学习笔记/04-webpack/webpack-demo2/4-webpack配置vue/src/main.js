
// 1. 使用commonJS的模块化规范
const {add, sub, mul}  = require('./js/mathUtils.js')
// mathUtils.js
add(10,20);

// 2. 使用ES6的模块化规范
import { Person } from './js/info.js'
// info.js
let person = new Person('kk', 18);
person.getInfo();

// 3. 依赖css文件
require('./css/normal.css')

// 4. 依赖less文件
require('./css/special.less')

// 5. 使用vue进行开发
import Vue from 'vue'
import App from './vue/App.vue'


new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  }

})