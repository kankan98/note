import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import router from './router/index.js'

// 1.导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 2.导入组件库的样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios
// 3. 安装组件库
Vue.use(Antd)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
