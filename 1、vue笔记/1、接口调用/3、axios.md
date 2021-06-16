<font face="微软雅黑" size="2">

## axios
- [axios](#axios)
  - [1. axios基本特性](#1-axios基本特性)
  - [2.基本用法](#2基本用法)
  - [3. 常用API](#3-常用api)
    - [3.1 GET请求](#31-get请求)
    - [3.2 DELETE请求](#32-delete请求)
    - [3.3 POST请求](#33-post请求)
    - [3.4 PUT请求](#34-put请求)
  - [4. axios的响应结果](#4-axios的响应结果)
  - [5. axios的全局配置](#5-axios的全局配置)
  - [6. axios拦截器](#6-axios拦截器)
    - [6.1 请求拦截器](#61-请求拦截器)
    - [6.2 响应拦截器](#62-响应拦截器)
    - [6.3 移除拦截器和添加拦截器](#63-移除拦截器和添加拦截器)
### 1. axios基本特性
axios是一个基于Promise用于浏览器和node.js的HTTP客户端。
- 支持浏览器和node.js
- 支持promise
- 能拦截请求和响应
- 自动转换JSON数据

```js
安装
1、使用npm
npm install axios
2、使用cdn
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
### 2.基本用法
```js
axios.get('.adata')
    .then(ret => {
      //data属性名称是固定的，用于获取后台响应的数据
      console.log(ret.data)
    })
```

### 3. 常用API
<strong>get、post、delete、put</strong>

#### 3.1 GET请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('/user/12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### 3.2 DELETE请求
```js
axios.delete('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### 3.3 POST请求
1、通过选项传递参数（默认传递的是json格式的数据）
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

2、通过URLSearchParams传递参数（application/x-www-form-urlencoded）
```js
const params = new URLSearchParams();
params.append('param1','value1');
params.append('param2','value2');
axios.post('/api/test',params).then(response =>{
  console.log(response)
})
```
#### 3.4 PUT请求

```js
axios.put('/user/12345', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
### 4. axios的响应结果
直接响应结果是一个对象，主要属性如下：
- **data**: 实际响应回来的数据
- **headers**：响应头信息，如{content-type:"text/html; charset=utf-8"}
- **status**：响应状态码，如'200'
- **statusText**：响应状态信息，如'OK'

### 5. axios的全局配置
```js
axios.defaults.timeout = 3000; //超时时间
axios.defaults.baseURL = 'https://api.example.com';   //默认地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  //设置请求头
```
### 6. axios拦截器
#### 6.1 请求拦截器

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.mytoken = 'hello';
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```
#### 6.2 响应拦截器
```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    return data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  //axios此时调取的数据是data
  axios.get('/user?ID=12345')
  .then(data =>{
    console.log(data);
  })
```
#### 6.3 移除拦截器和添加拦截器
```js
//移除拦截器
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

```js
//为自定义axios实例添加拦截器
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});

```

