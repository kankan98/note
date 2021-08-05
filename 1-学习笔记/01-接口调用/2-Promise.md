<font face="微软雅黑" size="2">

## Promise
- [Promise](#promise)
  - [1. Promise基本用法](#1-promise基本用法)
  - [2. 基于Promise处理Ajax请求](#2-基于promise处理ajax请求)
    - [2.1 处理原生ajax](#21-处理原生ajax)
    - [2.2 发送多次ajax请求](#22-发送多次ajax请求)
  - [3. Promise常用api](#3-promise常用api)
    - [3.1 实例方法](#31-实例方法)
    - [3.2 对象方法](#32-对象方法)
### 1. Promise基本用法
- 实例化Promise对象，**构造函数**函数，该函数用于处理异步任务
- `resolve`和`reject`两个参数用于处理成功和失败两种情况，并通过对象实例`.then`获取处理结果

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


### 2. 基于Promise处理Ajax请求
#### 2.1 处理原生ajax
1. get请求：
```js
function getData(url){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('get',url);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4) return;
            if(xhr.status == 200){
                resolve(xhr.responseText)
            }else{
                reject('出错了');
            }
        }
       
    });
}

getData('http://localhost:3000/data')
    .then(function(res){
        console.log(res);
    },function(err)
        console.log(err); 
    });
```
2. post请求
```js
function postData(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('post',url);
    xhr.send('name=kk&age=23');
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject('error')
      }
    }
  })
}

postData('https://api.github.com/users/dengkui123').then(function(res) {
  console.log(res);
},function(err) {
  console.log(err);
})
```
#### 2.2 发送多次ajax请求
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
### 3. Promise常用api
#### 3.1 实例方法
- then： 得到异步任务的正确结果
- catch： 获取异常信息
- finally：成功与否都会执行（尚且不是正式标准） 

#### 3.2 对象方法
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
