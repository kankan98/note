class Person{
  constructor(name,age) {
    this.name = name;
    this.age = age;
  };
  getInfo() {
    console.log(this.name, this.age);
  }

}
export {
  Person
};