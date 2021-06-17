<font face="微软雅黑" size="2">

## async和await
- [async和await](#async和await)
  - [1. async/await的基本用法](#1-asyncawait的基本用法)
  - [2. async/await 处理多个异步请求](#2-asyncawait-处理多个异步请求)
  - [3. 接口调用优化过程](#3-接口调用优化过程)
### 1. async/await的基本用法
- async/await是ES7引入的新语法，可以更加方便的进行异步操作
- async关键字用于函数上（async函数的返回值是Promise实例对象）
- await关键字用于async函数当中（await可以得到异步的结果）

```js
//基本格式：
async function queryData(id) {
  const ret = await axios.get('/data');
  return ret;
} 

queryData.then(ret => {
  console.log(ret);
})
```

例：
```js
async function queryData(){
  let ret = await axios.get('adata'); //这是一个promise的实例对象
  //console.log(ret.data);
  return ret.data;    
}

queryData().then(function(data){
  console.log(data);
})
```

```js
async function queryData(){
  let ret = await new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('hello axios!');
    },1000);
  })
  //console.log(ret.data);
  return ret;    
}

queryData().then(function(data){
  console.log(data);      //hello axios!
})
```

### 2. async/await 处理多个异步请求

```js
async function queryData(id){
  const info = await axios.get('/async1');
  const ret = await axios.get('async2?info=' + info.data);
  return ret;
} 
queryData.then(ret => {
  console.log(ret);
})
```
### 3. 接口调用优化过程

1、promise方式
```js
axios.defaults.baseURL = 'http://localhose:3000/';

mounted: function(){
  axios.get('books').then( data => {
    console.log(data.data);
    this.books = data.data;
  })
}
```

2、async/await方式
```js
axios.defaults.baseURL = 'http://localhose:3000/';

methods(){
  queryData: async function(){
    //调用后台接口获取数据
    let ret = await axios.get('books');
    this.books = ret.data;
  }
}

mounted(){
  this.queryData();
}
```

3、进一步简化
```js
axios.interceptors.response.use(function(res){
  return res.data;
},function(error){
  console.log(error);
});


methods(){
  queryData: async function(){
    //调用后台接口获取数据
    this.books = await axios.get('books');
  }
},

mounted(){
  this.queryData();
},
```
