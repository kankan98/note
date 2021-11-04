<font size=2 face="微软雅黑">

## 一、ES6
- [一、ES6](#一es6)
  - [1、	什么是ES？什么是ES6？](#1什么是es什么是es6)
  - [2、Proxy](#2proxy)
  - [3、实现可迭代接口](#3实现可迭代接口)
  - [4、生成器（generator）](#4生成器generator)
  - [5、ES5中类的继承](#5es5中类的继承)
  - [6、ES6中类的继承](#6es6中类的继承)
- [二、尚硅谷ES6笔记](#二尚硅谷es6笔记)
  - [1、this](#1this)
  - [2、迭代器](#2迭代器)
  - [3、生成器](#3生成器)
  - [4、Promise](#4promise)
  - [5、async 和 await](#5async-和-await)
### 1、	什么是ES？什么是ES6？
- ECMAScript他也是一门脚本语言，一般缩写为ES，通常会把他看作为JavaScript的标准规范。ES6是新一代JS的语言标准。
- 但实际上JavaScript是ECMAScript的扩展语言，因为ECMAScript只是提供了最基本的语法，通俗点来说只是约定了代码的如何编写。
- 总的来说浏览器环境中的JavaScript等于ECMAScript加上web所提供的API，也就是DOM和BOM。

### 2、Proxy
- 通过Proxy就可以轻松监视到对象的读写过程，相比于defineProperty，Proxy的功能要更为强大甚至使用起来也更为方便。
- 通过new Proxy的方式创建代理对象。
- Proxy构造函数的第一个参数就是需要代理的对象，第二个参数是代理对象处理对象，这可以通过get方法来去监视属性的访问，通过set方法来截取对象当中设置属性的过程。

```js
const person = {
    name: 'kk',
    age: 18,
    _home:'Shaoyang'
}

const personProxy = new Proxy(person, {
    // get: 读取某个属性
    get(target, property) {   //target:代理的目标对象 
        console.log(target, property);  //property:外部所访问的这个属性的属性名
        return property in target ? target[property] : undefined;
    },
    // set: 写入某个属性
    set(target, property, value) {  //property:写入的属性名  value:属性值
        console.log(target, property, value); 
        if (property === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError(`${value} must be a integer`);
            }
        }
        target[property] = value;
    },
    // deleteProperty:delete操作符调用
    deleteProperty(target, property) {
      console.log(target, property);
      if(property === 'age'){
        if(property in target && target[property] > 18){
          delete target[property];
        }
      }
    },
    //has拦截对for...in循环不生效
    has(target, property) { 
      console.log(target, property);
      if(property[0] === '_') return false;
      return property in target;
    }
})

console.log('name' in person, 'name' in personProxy);
console.log('_home' in person, '_home' in personProxy);
```
> get：读取某个属性<br>
> set：写入某个属性<br>
> has：in操作符调用<br>
> deleteProperty：delete操作符调用<br>
> apply：调用一个函数<br>
> construct：用new调用一个函数。
- 第二点是对于数组对象进行监视更容易。

通常想要监视数组的变化，基本要依靠重写数组方法，这也是Vue的实现方式，Proxy可以直接监视数组的变化。

```js
const list = [];
const listProxy = new Proxy(list, {
    set(target, property, value) {
        console.log(target, property, value);
        target[property] = value;
        return true; // 写入成功
    }
});

listProxy.push(100);
```
> Proxy内部会自动根据push操作推断出来他所处的下标，每次添加或者设置都会定位到对应的下标property。数组其他的也谢操作方式都是类似的。

### 3、实现可迭代接口
可迭代实现方法示例1：
```js
// js教程版本：
let range = {
  from: 1,
  to: 5
};

// 1. for..of 调用首先会调用这个：
range[Symbol.iterator] = function() {

  // ……它返回迭代器对象（iterator object）：
  // 2. 接下来，for..of 仅与此迭代器一起工作，要求它提供下一个值
  return {
    current: this.from,
    last: this.to,

    // 3. next() 在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// 现在它可以运行了！
for (let num of range) {
  alert(num); // 1, 然后是 2, 3, 4, 5
}
```
可迭代实现方法示例2：
```js
  let obj = {
      store: [1, 2, 3, 4, 5],
      [Symbol.iterator]: function() {
          let index = 0
          return {
              next: () => {
                  const result = {
                      value: this.store[index],
                      done: index >= this.store.length,
                  }
                  index++;
                  return result;
              }
          }
      }
  }

  for (const item of obj) {
      console.log(item); // 1, 2, 3, 4, 5
  }
```

### 4、生成器（generator）

```js
// 自增id
function * createId() {
    let id = 1;
    while(true) {
        yield id++;
    }
}

const id = createId();
id.next().value;
```
生成器版本的可迭代方法1（优化）
```js
// 生成器版本的迭代
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};
console.log( [...range] ); // 1,2,3,4,5
```

生成器版本的可迭代方法2（优化）
```js
let obj = {
  store:[1,2,3,4,5],
  *[Symbol.iterator]() {
    for(let index = 0; index < this.store.length;index++) {
      yield this.store[index];
    }
  }
}

console.log([...obj])
```
> 来源：https://mp.weixin.qq.com/s/Kg7Fhoq3sKycw-8SpGxlKA

### 5、ES5中类的继承
- **ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上`(Parent.apply(this))`。**
```js
  // 定义父类
  function Parent(name, age) {
    this.name = name; //属性
    this.age = age;
    // 属性方法
    this.run = () => {
      console.log(this.name + '在跑步');
    }
  }
  // 静态方法
  Parent.sleep = () => {
    console.log(`静态方法：${this.name}在睡觉`);
  }
  // 原型链上属性
  Parent.prototype.sex = '男';
  // 原型链上方法
  Parent.prototype.say = function() {
    console.log(this.name + '在说话');
  }

  Parent.sleep();
  // --------------------------------
  // 定义继承类
  function Child(name, age, hometown) {
    this.hometown = 'shaoyang'
    Parent.call(this, name, age);
  }
  Child.prototype = new Parent(); 
  //Child.prototype.__proto__ === Parent.prototype

  //使用方法
  let child = new Child('dk', 18);
  console.log(`姓名：${child.name},年龄：${child.age},性别：${child.sex},来自：${child.hometown}`);
  child.run();
  // child.sleep();    //error
  child.say();
```

### 6、ES6中类的继承
- **ES6的继承机制是：先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。**

new一个对象时，会经历以下几个步骤（摘自javascript高级程序设计）：
1. 创建一个对象；
2. 将构造函数的作用域赋值给新对象（因此this就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象

- 具体的： `ES6` 通过 `class` 关键字定义类，里面有构造方法，类之间通过 `extends` 关键字实现继承。子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例报错。因为子类没有自己的 `this` 对象，而是继承了父类的 `this` 对象，然后对其进行加工。如果不调用 `super` 方法，子类得不到 `this` 对象。

> ps：`super`关键字指代父类的实例，即父类的`this`对象。在子类构造函数中，调用`super`后，才可使用`this`关键字，否则报错。

```js
  // 定义父类
  class Parent {
    constructor(name, age) {
      // 属性
      this.name = name;
      this.age = age;
    }
    // 父类方法
    run() {
      console.log(this.name + '正在跑步');
    }
  }
//-------------------------------------------------------
  // 定义子类
  class Child extends Parent {
    constructor(name, age, sex, hometown) {
      super(name, age); //在没有调用super之前使用this会报错
      this.sex = sex;
      this.hometown = hometown;
    }
    sleep() {
      console.log(this.name + '在'+ this.hometown +'睡觉')
    }
  }


// 使用方法
let child = new Child('邓奎',23,'男','邵阳');
console.log(`姓名：${child.name},年龄：${child.age},性别：${child.sex},来自：${child.hometown}`);
child.run();
child.sleep();
console.log(Child.__proto__=== Parent);//true 
console.log(Child.__proto__);//父类对象
console.log(Child.prototype.__proto__=== Parent.prototype);//true
```
1. 子类的proto属性,表示构造函数的继承，总是指向父类。
2. 子类的prototype属性的proto属性表示方法的继承，总是指向父类的prototype属性


## 二、尚硅谷ES6笔记
### 1、this
1. `this` 是静态的, `this` 始终指向函数声明时所在作用域下 `this` 的值( call、apply 无法修改)
2. 不能作为构造函数实例化对象
3. 不能使用 `arguments` 变量
4. 箭头函数简写
   1) 只有一个参数可省略小括号
   2) 代码体只有一条语句可省略花括号和 `return` ，语句执行结果就是返回值

### 2、迭代器
```js
const test = {
  length: 4,
  list: ['one', 'two', 'three', 'four'],
  [Symbol.iterator]() {
    let index=0;
    return {
      next:() => {
        if( index < this.length ) {
          const result={
            value: this.list[index],
            done: false
          }
          index++;
          return result;
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

for(let i of test) {
  console.log(i);
}
```

### 3、生成器
1. 定义
```js
function * gen(arg) {
  console.log(arg);
  let one = yield 111;
  console.log(one);
  let two = yield 222;
  console.log(two);
  let three = yield 333;
  console.log(three);

}

let iterator = gen('AAA');
console.log(iterator.next());
console.log(iterator.next('BBB'));  // 第2个iterator的参数会作为第一个yield的返回值
console.log(iterator.next('CCC'));
console.log(iterator.next('DDD'));
```

2. 生成器实例
```js
function getUsers() {
  setTimeout(() => {
    let data1 = "用户数据";
    iterator.next(data1);
  },1000)
}

function getOrders() {
  setTimeout(() => {
    let data2 = "订单数据"
    iterator.next(data2);
  },1000)
}

function getGoods() {
  setTimeout(() => {
    let data3 = "商品数据";
    iterator.next(data3);
  },1000)
}

function * gen() {
  let users = yield getUsers();
  console.log(users);
  //可以对返回的数据进行操作
  let orders = yield getOrders();
  console.log(orders);
  let goods = yield getGoods();
  console.log(goods);
}

let iterator = gen();
iterator.next();
```

### 4、Promise
1. `Promise` 读取文件
```js
const fs  = require('fs');

// fs.readFile('./ES6.md', (err,data) => {
//   if(err) throw err;
//   console.log(data.toString());
// })

// 使用 Promise 封装
const p = new Promise((resolve,reject) => {
  fs.readFile('./ES6.md', (err,data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    }
  })
})

p.then(res => {
  console.log(res.toString());
},err => {
  console.log('读取失败');
})
```

2. `Promise` 封装 `Ajax`
```js
// 接口地址：https://api.apiopen.top/getJoke
const p = new Promise((resolve,reject) => {
  // 1.创建对象
  const xhr = new XMLHttpRequest();
  // 2.初始化
  xhr.open('get','https://api.apiopen.top/getJoke');
  // 3.发送
  xhr.send();
  // 4.绑定事件，处理响应结果
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(xhr.status);
      }
    }
  }
})

p.then(res => {
  console.log(res);
},err => {
  console.error(err);
})
```

3. `Promise` 读取多个文件
```js
const fs = require('fs');

// fs.readFile('./resources/text1.md',(err,data1) => {
//   fs.readFile('./resources/text2.md',(err,data2) => {
//     fs.readFile('./resources/text3.md',(err,data3) => {
//       let res = data1 + '\n' + data2 + '\n' + data3
//       console.log(res);
//     })
//   })
// })

const p = new Promise((resolve, reject) => {
  fs.readFile('./resources/text1.md',(err,data) => {
    resolve(data);
  })
})

p.then(res1 => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resources/text2.md',(err, res2) => {
      resolve([res1, res2])
    })
  })
}).then(res2 => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resources/text3.md',(err, res3) => {
      resolve([...res2 , res3]) //  [text1,text2,text3]
    }) 
  }) 
}).then(res => {
  console.log(res.join('\n'));
})
```

### 5、async 和 await
1. `async` 和 `await` 结合读取文件
```js
const fs = require('fs');

function readText1() {
  return new Promise((resolve,reject) => {
    fs.readFile('./resources/text1.md', (err,data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
function readText2() {
  return new Promise((resolve,reject) => {
    fs.readFile('./resources/text2.md', (err,data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
function readText3() {
  return new Promise((resolve,reject) => {
    fs.readFile('./resources/text3.md', (err,data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}

async function main() {
  let data1 = await readText1();
  let data2 = await readText2();
  let data3 = await readText3();
  console.log(data1.toString(),data2.toString(),data3.toString());
}

main();
```

2. `async` 和 `await` 封装 `Ajax` 请求
```js
    // f发送 Ajax 请求, 返回的结果是 Promise 对象  
    function sendAjax(url) {
      return new Promise((resolve,reject) => {
        // 1.创建对象
        const xhr = new XMLHttpRequest();
        // 2.初始化
        xhr.open('get',url);
        // 3.发送
        xhr.send();
        // 4.事件绑定
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(xhr.status);
            }
          }
        }
      })
    }
    async function main() {
      let res = await sendAjax("https://api.apiopen.top/getJoke");
      console.log(res);
    }
    main();
    
```
