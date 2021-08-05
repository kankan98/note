<font size=2 face="微软雅黑">

## Ajax

### 1、Ajax原理
Ajax 的核心是 js 对象：XMLHttpRequest。
- **一个完整的 HTTP 请求**
1. 请求的网址、请求方法 get/post。
2. 提交请求的内容数据、请求主体等。
3. 接收响应回来的内容。
- **发送 Ajax 请求的五个步骤：**
1. 创建异步对象，即 `XMLHttpRequest` 对象。

2. 使用 open 方法设置请求参数。`open(method, url, async)`。参数解释：请求的方法、请求的 `url`、是否异步。第三个参数如果不写，则默认为 `true`。

3. 发送请求：`send()`。

4. 注册事件：注册 `onreadystatechange` 事件，状态改变时就会调用。
如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。**当 readyState 等于 4，且状态码status为 200 时，表示响应已就绪。**

5. 服务端响应，获取返回的数据。
> responseText：获得字符串形式的响应数据。<br>
> responseXML：获得 XML 形式的响应数据。

**get请求：**
```js
function getData(url,success,fail) {
  //（1）创建XMLHttpRequest对象
  let xhr = new XMLHttpRequest();
  //（2）设置请求的参数。包括：请求的方法、请求的url。
  xhr.open('get',url);
  //（3）发送请求
  xhr.send();
  //（4）注册事件。 onreadystatechange事件，状态改变时就会调用。
  //如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
  xhr.onreadystatechange = function() {
     // 为了保证 数据 完整返回，我们一般会判断 两个值
    if(xhr.readyState !== 4) return;
    if(xhr.readyState === 4 && xhr.status === 200) {
      let obj = JSON.parse(xhr.responseText);
      console.log('success');
      success && success(obj);
    } else {
      // 传了 fail 参数，就调用后面的 fail()；如果没传 fail 参数，就不调用后面的内容。
      fail && fail(new Error('接口请求失败'));
    }
  }
}
// 多次调用ajax
getData('https://api.github.com/users/dengkui123',(res) => {
  console.log(res);
  getData('https://api.github.com/users/dengkui123',(res) => {
    console.log(res.avatar_url);
    getData('https://api.github.com/users/dengkui123',(res) => {
      console.log(res.html_url);
    })
  })
});
```
**post请求：**
```js
function postData(url,success,fail) {
  let xhr = new XMLHttpRequest();
  xhr.open('post',url);
  // 如果想要使用post提交数据,必须添加此行
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.send('name=kk&age=18');
  xhr.onreadystatechange = function() {
    if(xhr.readyState !== 4) return;
    if(xhr.readyState === 4 && xhr.status === 200) {
      let obj = xhr.responseText();
      console.log(obj);
      success && success(obj);
    } else {
      fail && fail(new Error('接口请求失败'));
    }
  }
}

postData('https://api.github.com/users/dengkui123',(res) => {
  console.log(res)
},(err)=> {
  console.log(err);
});

```



> 作者：千古壹号<br>
> 链接：https://github.com/qianguyihao/Web/blob/master/06-JavaScript%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B%EF%BC%9AAjax%E5%92%8CPromise/02-Ajax%E5%85%A5%E9%97%A8%E5%92%8C%E5%8F%91%E9%80%81http%E8%AF%B7%E6%B1%82.md