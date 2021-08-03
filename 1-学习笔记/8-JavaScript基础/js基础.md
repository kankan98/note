<font face="微软雅黑" size=2>

## JavaScript
- [JavaScript](#javascript)
  - [1.实现sum(1)(2)(3)](#1实现sum123)
  - [2. 深拷贝](#2-深拷贝)
  - [3.去重](#3去重)
  - [4. new操作中发生了什么？](#4-new操作中发生了什么)
  - [5. 快速排序](#5-快速排序)
  
### 1.实现sum(1)(2)(3)
```js
function sum(x) {
  let num = x;
  let tmp = function (y) {
    num = num + y;
    return tmp;
  }
  tmp.toString = function () {
    return num;
  };
  return tmp;
}

console.log(sum(1)(2)(3));  // 6
```


>首先要一个数记住每次的计算值，所以使用了闭包，在 tmp 中记住了 x 的值，第一次调用 sum() ,初始化了 tmp，并将 x 保存在 tmp 的作用链中，然后返回 tmp 保证了第二次调用的是 tmp 函数，后面的计算都是在调用 tmp, 因为 tmp 也是返回的自己，保证了第二次之后的调用也是调用 tmp，而在 tmp 中将传入的参数与保存在作用链中 x 相加并付给 num，这样就保证了计算；

>但是在计算完成后还是返回了 tmp 这个函数，这样就获取不到计算的结果了，我们需要的结果是一个计算的数字那么怎么办呢，首先要知道 JavaScript 中，打印和相加计算，会分别调用 toString 或 valueOf 函数，所以我们重写 tmp 的 toString 和 valueOf 方法，返回 num 的值；

- 实现`sum(1)(2)(3)()`
```js

const sum = a => b => b ? sum( a + b ) : a;
console.log(sum(1)(2)(3)());
```

### 2. 深拷贝
如果在拷贝这个对象的时候，**只对基本数据类型进行了拷贝，而对引用数据类型只是进行了引用的传递**，而没有重新创建一个新的对象，则认为是**浅拷贝**。反之，在对引用数据类型进行拷贝的时候，**创建了一个新的对象**，并且复制其内的成员变量，则认为是**深拷贝**。
```js
// 深拷贝
function cloneDeep(target) {
  if(typeof target === 'object') {
    const result = Array.isArray(target) ? [] : {};
    for(let i in target) {
      if(typeof target[i] === 'object') {
        result[i] = cloneDeep(target[i]);
      } else {
        result[i] = target[i]; 
      }
    }
    return result;
  } else if(typeof target === 'function') {
    return new Function('return ' + target )();
  } else {
    return target;
  }
}
```

其他方法：
```js
// lodash里的_.cloneDeep方法
let objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

```js
// JSON.parse(JSON.stringify(obj))
let objects = [{ 'a': 1 }, { 'b': 2 }];
let deep = JSON.parse(JSON.stringify(objects));
```
### 3.去重
```js
// 方式1：Set去重
function unique(arr) {
  return Array.from(new Set(arr));
}
```

```js
// 方式2：空间换时间
function unique(arr) {
  const res = [];
  const map = new Map();

  for(let val of arr) {
    if(!map.has(val)) {
      res.push(val);
      map.set(val,true)
    }
  }
  return res
}

```
### 4. new操作中发生了什么？
> 原文链接：https://www.cnblogs.com/echolun/p/10903290.html
> https://www.cnblogs.com/echolun/p/10110839.html
- new一个实例
```js
// es5
const Parent = function (name, age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.sayHi = function () {
  console.log('hi');
}
const child = new Parent();
child.sayHi()

// es6 是es5的语法糖
class Parent {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  };
  sayHi () {
    console.log('hi');
  };
}
const child = new Parent();
child.sayHi();

```

**new 一个对象过程中，主要发生了以下步骤：**

1. 以构造器的prototype属性为原型，创造一个新的、空的对象
2. 将它的引用赋给构造器的 this，同时将参数传到构造器中执行
3. 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动return的对象。

```js
// 构造器函数
let Parent = function(name,age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.sayHi = function() {
  console.log('hi');
}
//自己定义的new方法
const newMethod = function(Parent, ...rest) {
  // 1.以构造器的prototype属性为原型，创造一个新的、空的对象
  let child = Object.create(Parent.prototype);
  // 2.将它的引用赋给构造器的 this
  let result = Parent.apply(child, rest);
  // 3.如果构造器没有手动返回对象，则返回第一步创建的新对象
  return typeof result === 'object' ? result : child;
}
//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent,'kankan','23');
console.log(child.name);
console.log(child.age);
console.log(child.sayHi());

//最后检验，与使用new的效果相同
console.log(child instanceof Parent);
console.log(child.hasOwnProperty('name'));
console.log(child.hasOwnProperty('age'));
console.log(child.hasOwnProperty('sayHi'));
```

### 5. 快速排序
```js
const quickSort = (array) => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
      return
    }
    let i = left
    let j = right
    const baseVal = arr[j] // 取无序数组最后一个数为基准值
    while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
      while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
        i++
      }
      arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
        j--
      }
      arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    sort(arr, left, j - 1) // 将左边的无序数组重复上面的操作
    sort(arr, j + 1, right) // 将右边的无序数组重复上面的操作
  }
  const newArr = array.concat() // 为了保证这个函数是纯函数拷贝一次数组 
  sort(newArr)
  return newArr
}
console.log(quickSort([7,1,5,2,4,6,3]))
```
