<font face="微软雅黑" size="2">

## axios

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
#### 3.5 axios的响应结果
<font size='2'><strong>响应结果的主要属性：</strong></font>
- data: 实际响应回来的数据
- headers：响应头信息
- status：响应状态码
- statusText：响应状态信息


