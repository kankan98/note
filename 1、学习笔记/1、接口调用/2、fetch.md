<font face="微软雅黑" size="2">

## Fetch
- [Fetch](#fetch)
  - [1. fetch概述](#1-fetch概述)
    - [1.1 基本特性](#11-基本特性)
    - [1.2 语法结构](#12-语法结构)
  - [2. fetch基本用法](#2-fetch基本用法)
  - [3. fetch请求参数](#3-fetch请求参数)
    - [3.1 常用配置选项](#31-常用配置选项)
    - [3.2 Get请求方式的参数传递](#32-get请求方式的参数传递)
    - [3.3 DELETE请求方式的参数传递](#33-delete请求方式的参数传递)
    - [3.4 POST请求方式的参数传递](#34-post请求方式的参数传递)
    - [3.5 PUT请求方式的参数传递](#35-put请求方式的参数传递)
  - [4. fetch响应结果](#4-fetch响应结果)
    - [4.1 响应数据格式](#41-响应数据格式)

### 1. fetch概述
#### 1.1 基本特性
- 更加简单的数据获取方式，功能更强大、更灵活，可以看作是xhr的升级版
- 基于Promise实现

#### 1.2 语法结构
```js
fecth('url').then(func1)
            .then(func2)
            ...
            .catch(func)
```
### 2. fetch基本用法
```js
fecth('localhost:3000/abc').then(data => {
    return data.text();     //text代指api的一部分，text的返回值是一个promise对象
}).then(ret => {
    console.log(ret)    //最终数据
})

//模拟接口
app.get('/abc',(req, res) => {
    res.send('Hello Fetch!')
})
```

### 3. fetch请求参数
#### 3.1 常用配置选项
- method(String)：HTTP请求方法，默认为GET（GET、POST、PUT、DELETE）
- body(string)：HTTP请求参数
- headers(Object)：HTTP的请求头，默认为{}

#### 3.2 Get请求方式的参数传递
```js
fetch('localhost:3000/abc?id=123',{
    method: 'get'
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret)
})
```

方式1：

```js
//传统参数传递方式
fetch('/books?id=123').then(data => {
    return data.text();
}).then(ret => {
    console.log(ret)    //输出：传统的URL传递参数！123
})

//接口写法
app.get('localhost:3000/books',(req, res) => {
    res.send('传统的URL传递参数！' + req.query.id)
})
```
等价于：

```js
//Get请求方式的参数传递
fetch('localhost:3000/books/456',{
  methods:'get'
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret);       //输出：Restful形式的URL传递参数！456
})

//接口写法
app.get('/books/:id',(req, res) => {
    res.send('Restful形式的URL传递参数！' + req.params.id)
})
```
#### 3.3 DELETE请求方式的参数传递
```js
//Delete请求方式的参数传递
fetch('localhost:3000/books/789',{
  methods:'delete'
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret);   //输出：DELETE请求传递参数！789
})

//接口写法
app.delete('/books/:id',(req, res) => {
    res.send('DELETE请求传递参数！' + req.params.id)
})
```

#### 3.4 POST请求方式的参数传递
用法1：

```js
//Post请求方式的参数传递
fetch('localhost:3000/books',{
    methods:'post',
    body:'uname=lisi&pwd=123',  //传统参数
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret);   //输出：PUST请求传递参数！lisi---123
})

//接口写法
app.post('localhost:3000/books',(req, res) => {
    res.send('PUST请求传递参数！' + req.body.uname + '---' req.body.pwd)
})
```
用法2：
```js
//Post请求方式的参数传递
fetch('localhost:3000/books',{
    methods:'post',
    body: JSON.stringify({
        uname: '张三',  //json格式的参数
        age: '123'
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret);   //输出：PUST请求传递参数！张三---123
})

//接口写法
app.post('/books',(req, res) => {
    res.send('PUST请求传递参数！' + req.body.uname + '---' req.body.pwd)
})
```
#### 3.5 PUT请求方式的参数传递
```js
//Put请求方式的参数传递
fetch('localhost:3000/books/123',{
    methods:'put',
    body: JSON.stringify({
        uname: '张三',  //json格式的参数
        pwd: '789'
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret);   //输出：PUT请求传递参数！123---张三---789
})

//接口写法
app.put('/books/:id',(req, res) => {
    res.send('PUT请求传递参数！' + req.params.id + '---' + req.body.uname + '---' req.body.pwd)
})
```
- 和POST方式类似，PUT也有传统格式数据传参方法
### 4. fetch响应结果
#### 4.1 响应数据格式
- text()：将返回体处理成字符串类型
- json()：返回结果和JSON.parse(responseText)一样
```js
fetch('http://localhost:3000/json').then(data => {
    //return data.text();
    return data.json();
}).then(data=>{
    console.log(data);   
    }
})
                                                     
// 输出：Object:
// {
//   age: 13,
//   gender:'male',
//   uname:'lisi',
// }

// 接口
app.get('/json',(req, res) => {
    res.json({
        uname: 'list',
        age: 13,
        gender: 'male'
    });
})
```
用text格式：
```js
fetch('http://localhost:3000/json').then(data => {
    return data.text();
}).then(data=>{
    let obj = JSON.parse(data);
    console.log(obj.uname,obj.age,obj.gender);  //lisi 13 male   
    }
})

//接口
app.get('/json',(req, res) => {
    res.json({
        uname: 'list',
        age: 13,
        gender: 'male'
    });
})
```