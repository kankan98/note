## vue笔记
- [vue笔记](#vue笔记)
  - [一、Promise](#一promise)
    - [1. Promise基本用法](#1-promise基本用法)
    - [2. 基于Promise处理Ajax请求](#2-基于promise处理ajax请求)
      - [2.1 处理原生ajax](#21-处理原生ajax)
      - [2.2 发送多次ajax请求](#22-发送多次ajax请求)
    - [3. Promise常用api](#3-promise常用api)
      - [3.1 实例方法](#31-实例方法)
      - [3.2 对象方法](#32-对象方法)
  - [二、fetch](#二fetch)
    - [1. fetch概述](#1-fetch概述)
      - [1.1 基本特性](#11-基本特性)
      - [1.2 语法结构](#12-语法结构)
    - [2. fetch基本用法](#2-fetch基本用法)
    - [3. fetch请求参数](#3-fetch请求参数)
      - [3.1 常用配置选项](#31-常用配置选项)
      - [3.2Get请求方式的参数传递](#32get请求方式的参数传递)
      - [3.3 DELETE请求方式的参数传递](#33-delete请求方式的参数传递)
      - [3.4 POST请求方式的参数传递](#34-post请求方式的参数传递)
      - [3.5 PUT请求方式的参数传递](#35-put请求方式的参数传递)
    - [4. fetch响应结果](#4-fetch响应结果)
      - [4.1 响应数据格式](#41-响应数据格式)

### 一、Promise
#### 1. Promise基本用法
- 实例化Promise对象，<font color="red">构造函数</font>中传递<font color="red">函数</font>，该函数用于处理异步任务
- <font color="red">resolve</font>和<font color="red">reject</font>两个参数用于处理成功和失败两种情况，并通过对象实例<font color="red">.then</font>获取处理结果

```js
var p = new Promise(function(resolve, reject){
    if(true){
        resolve();  //成功时调用 
    }else{
        reject();   //失败时调用 
    }
});
p.then(function(ret){
    console.log(ret);   //从resolve得到正常结果
},function(ret){
    console.log(ret);   //从reject得到错误信息
})

```


#### 2. 基于Promise处理Ajax请求
##### 2.1 处理原生ajax
```js
function queryData(url){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4) return;
            if(xhr.readyState == 200){
                resolve(xhr.responseText)
            }else{
                reject('出错了');
            }
        }
        xhr.open('get',url);
        xhr.send(null);
    });
}

queryData('http://localhost:3000/data')
    .then(function(data){
        console.oog(data);
    },function(info){
        console.log(info); 
    });
```

##### 2.2 发送多次ajax请求
```js
queryData('http://localhost:3000/data')
    .then(function(data){
        console.log(data);
        return queryData('http://localhost:3000/data1');
    })
    .then(function(data){
        console.log(data);
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve('hello');
            },1000)
        })
    })
    .then(function(data){
        console.log(data);      //data = 'hello'
    });
```
#### 3. Promise常用api
##### 3.1 实例方法
- then： 得到异步任务的正确结果
- catch： 获取异常信息
- finally：成功与否都会执行（尚且不是正式标准） 

##### 3.2 对象方法
- all：并发处理多个异步任务，所有任务都执行完成才能得到结果
- race：并发处理多个异步任务，只要有一个任务完成就能得到结果
```js
let p1 = queryData('http://localhost:3000/data1');
let p2 = queryData('http://localhost:3000/data2');
let p3 = queryData('http://localhost:3000/data3');

Promise.all[p1,p2,p3].then(function(result){
    console.log(result);
});
Promise.race[p1,p2,p3].then(function(result){
    console.log(result);
});
```
### 二、fetch
#### 1. fetch概述
##### 1.1 基本特性
- 更加简单的数据获取方式，功能更强大、更灵活，可以看作是xhr的升级版
- 基于Promise实现

##### 1.2 语法结构
```js
fecth('url').then(func1)
            .then(func2)
            ...
            .catch(func)
```
#### 2. fetch基本用法
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

#### 3. fetch请求参数
##### 3.1 常用配置选项
- method(String)：HTTP请求方法，默认为GET（GET、POST、PUT、DELETE）
- body(string)：HTTP请求参数
- headers(Object)：HTTP的请求头，默认为{}

##### 3.2Get请求方式的参数传递
```js
fetch('localhost:3000/abc?id=123',{
    method: 'get'
}).then(data => {
    return data.text();
}).then(ret => {
    console.log(ret)
})
```

<small>方式1：</small>

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
<small>等价于：</small>

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
##### 3.3 DELETE请求方式的参数传递
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

##### 3.4 POST请求方式的参数传递
<small>用法1：</small>

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
<small>用法2：</small>

```js
//Post请求方式的参数传递
fetch('localhost:3000/books',{
    methods:'post',
    body: JSON.stringify({
        uname: '张三',  //json格式的参数
        age: '123'
    })
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
##### 3.5 PUT请求方式的参数传递
```js
//Put请求方式的参数传递
fetch('localhost:3000/books/123',{
    methods:'put',
    body: JSON.stringify({
        uname: '张三',  //json格式的参数
        pwd: '789'
    });
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
#### 4. fetch响应结果
##### 4.1 响应数据格式
- text()：将返回体处理成字符串类型
- json()：返回结果和JSON.parse(responseText)一样
- 
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

<small> 用text格式：</small>

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