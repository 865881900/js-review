//  var function
const a = 1;
// var a = 2;
// b = 3;
// let a =12;
// es6 let const class

const ajax = {
  getUserInfo() {
    // 异步请求
    return {
      age: 18,
      name: '小明',
    };
  },
};
class User {
  id = '';

  age = '';

  name = '';

  constructor(id) {
    this.id = id;
  }

  getAge() {
    return this.age;
  }

  setAge(age) {
    this.age = age;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  async getUserInfo() {
    const user = await ajax.getUserInfo(this.id);
    this.setAge(user.age);
    this.setAge(user.name);
  }
}
const user = User(a);
console.log(user);
