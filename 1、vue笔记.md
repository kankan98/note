<font face="微软雅黑" size="3">vue笔记
## vue笔记
### 1、Promise
#### 1.1 Promise基本用法
- 实例化Promise对象，<font color="red">构造函数</font>中传递<font color="red">函数</font>，该函数用于处理异步任务
- <font color="red">resolve</font>和<font color="red">reject</font>两个参数用于处理成功和失败两种情况，并通过对象实例<font color="red">.then</font>获取处理结果

```
var p = new Promise(function(resolve,reject){
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
#### 1.2 基于Promise处理Ajax请求
##### 1、处理原生ajax
```
function queryData(url){
    return new Promise(function(resolve,reject){
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

##### 2、发送多次ajax请求
```
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
#### 1.3 Promise常用api
##### 1、实例方法
- then： 得到异步任务的正确结果
- catch： 获取异常信息
- finally：成功与否都会执行（尚且不是正式标准） 

##### 2、对象方法
- all：并发处理多个异步任务，所有任务都执行完成才能得到结果
- race：并发处理多个异步任务，只要有一个任务完成就能得到结果
```
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

