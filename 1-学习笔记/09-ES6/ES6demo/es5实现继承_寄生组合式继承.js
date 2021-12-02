function o(superType) {
  var F = function(){};
  F.prototype = superType;
  return new F();
}

// function inheritPrototype(subType, superType) {
//   var tempType = o(superType.prototype);  // 创建对象
//   tempType.constructor = subType;         // 增强对象  
//   subType.prototype = tempType;           // 指定对象
// }

function inheritPrototype(subType, superType) {
  subType.prototype = o(superType.prototype);
  Object.defineProperty(subType.prototype, 'constructor', {
    configurable:true,
    enumerable: false,
    writable: true,
    value: subType,
  })
  //或
  // subType.prototype.constructor = subType;
}
function Parent(name,age) {
  this.name = name;
  this.age = age;

  this.sing = function() {
    console.log(this.name + ' likes singing!');
  }
}

Parent.prototype.dance = function() {
  console.log(this.name + ' likes dancing!');
}

function Child(name, age, sex, home) {
  this.sex = sex;
  this.home = home;
  Parent.call(this, name, age);

  this.sleep = function() {
    console.log(this.name + ' likes sleeping!');
  }
}

inheritPrototype(Child, Parent);



Child.prototype.walk = function() {
  console.log(this.name + ' likes walking!');
}

Child.prototype.getInfo = function() {
  console.log("My name is "+ this.name + " and I'm " + this.age + ', I come from '+ this.home + '.');
}

let person = new Child('dk', 23, 'man', 'shaoyang');
let person2 = new Child('kk',18,'man','shenzhen');
console.log(person);
console.log(person.__proto__);
console.log(person.__proto__ === Child.prototype);
console.log(person.__proto__.__proto__);
console.log(person.__proto__.__proto__ === Parent.prototype);
// Child {
//   sex: 'man',
//   home: 'shaoyang',
//   name: 'dk',
//   age: 23,
//   sing: [Function (anonymous)],
//   sleep: [Function (anonymous)]
// }
person.sleep();
person.walk();
person.sing();
person.dance();
person.getInfo();

person2.sleep();
person2.walk();
person2.sing();
person2.dance();
person2.getInfo();
