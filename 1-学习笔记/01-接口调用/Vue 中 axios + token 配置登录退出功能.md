<font face="微软雅黑" size="2">

## Vue 中的 axios + token 配置登录请求
- [Vue 中的 axios + token 配置登录请求](#vue-中的-axios--token-配置登录请求)
  - [1. 配置axios发起登录请求](#1-配置axios发起登录请求)
  - [2. 路由导航守卫控制访问权限](#2-路由导航守卫控制访问权限)
  - [3. 退出功能](#3-退出功能)
  - [1. 通过 axios 请求拦截器添加 token ，保证拥有获取数据的权限。](#1-通过-axios-请求拦截器添加-token-保证拥有获取数据的权限)
### 1. 配置axios发起登录请求
```js
//main.js
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseUrl = 'https://api.example.com'

Vue.prototype.$http = axios
```
```js
//调用方法
async function queryData(){
  const {data: res} = await this.$http.post('login', {
    username: "admin",
    password: "123456" 
  });
  if(res.meta.status != 200) return console.log("登陆失败");
  console.log("登陆成功");
//将token保存到 sessionStorage 中
  window.sessionStorage.setItem('token', res.data.token);
  this,$router.push("/");
}
```
### 2. 路由导航守卫控制访问权限
- 挂载路由导航守卫：
  ```js
  //router.js
  router.beforeEach((to, form, next) => {
    //如果用户访问的登录页，直接放行
    if(to.path === '/login'){
      return next();
    } 
    //从 sessionStorage 中获取到保存的 token 值
    const tokenStr = window.sessionStorage.getItem('token');
    // 没有 token, 强制跳转到登录页
    if(!tokenStr){
      return next('/login');
    }
    //否则放行
    next();
  })
  ```
### 3. 退出功能
**销毁本地的 token 即可**
```js
// 清空token
window.sessionStorage.clear()
// 跳转到登录页
this.$router.push('/login')
```
### 1. 通过 axios 请求拦截器添加 token ，保证拥有获取数据的权限。

**需要授权的API，必须在请求头中使用 Authorization 字段提供 token 令牌**
```js
//main.js
//请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})
```