<font face="微软雅黑" size="2">

## async

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
