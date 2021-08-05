import $ from 'jquery'
import './css/test.css'
import './css/test.less'
import './css/test.scss'

$(function(){
  $('li:odd').css('backgroundColor','pink')
  $('li:even').css('backgroundColor','lightblue')
})

class Person{
  static info = "aaa";
}
console.log(Person.info);

//-----------------------------
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