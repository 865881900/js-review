/**
 * js中创造对象的方法
 */

/**
 * 1: 工厂模式
 * 思路: 在一个函数中创造一个原始对象,根据该函数的参数,对该对象进行赋值.
 * 缺点: 不能识别对象的类型;
 * @param name 返回对象的参数
 * @param age 返回对象的参数
 * @return {Object} 返回一个有相同函数和方法的对象
 */
function creatPerson(name, age) {
  const o = {};
  o.name = name;
  o.age = age;
  o.getName = function () {
    return this.name;
  };
  return o;
}
const person1 = creatPerson('王超朋', 19);
console.log(person1);

/**
 * 2: 构造器模式
 * 使用构造器,创建对象
 *创造对象分为4步:
 *  1: 创造一个新的对象
 *  2: 将构造函数的作用域赋给新对象
 *  3: 执行构造器函数, 把值添加到新的对象
 *  4: 返回一个对象
 *构造函数有三种调用方式:
 * 1: 用new操作符,创造对象
 * 2: 直接调用函数如: Person('王超朋',18); 此时的this指向window, window.age === 18
 * 3: 使用call,apply,bing 调用用
 * @param name
 * @param age
 * @constructor
 */
function Person2(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    return this.name;
  };
}
// 使用new操作符创造对象
const person2 = new Person2('王超朋', 18);
console.log(person2);

/**
 * 3. 原型模式
 * 缺点:
 * 1. 用该构造函数所创建的实例,共享原型的方法和属性,意味着一个改变, 那么其他对象上的值,也会发生变化
 * 2. 如果在对象上重写了原型上的属性,那么在用该对象.属相的时候,返回的是该对象的属相,而不是原型上的同名属性
 * @constructor
 */
function Person3() {
}
Person3.prototype.name = '王超朋';
Person3.prototype.age = 12;
Person3.prototype.getName = function () {
  return this.name;
};
const person3 = new Person3();
console.log(person3);

function Person4() {

}
Person4.prototype = {
  name: '王超朋',
  age: 18,
  getName() {
    return this.name;
  },
};
