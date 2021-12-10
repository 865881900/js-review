// Symbol.hasInstance 指向对象的内部方法, 但执行指令instanceof时,执行该方法; instanceof是判断左边是不是右边的派生类;
// class SymbolTest {
//     [Symbol.hasInstance](foo) {
//         return false
//     }
// }
//
// const st1 = new SymbolTest();
// console.log(12 instanceof st1);
//
// Symbol.isConcatSpreadable 指向数组的内部方法, 但调用数组的concat方法是执行该函数,返回是否可以展开;
// Array.prototype[Symbol.isConcatSpreadable]  = false;
// class MyArray extends Array {
//     constructor(...args) {
//         super(...args);
//         // 这样实现,会给美枚举到
//         this[Symbol.isConcatSpreadable] = false;
//     }
//
//     // 通过继承父类添加get方法实现
//     index.js [Symbol.isConcatSpreadable]() {
//         return false
//     }
// }
// 这也就不会被枚举了
// const arr3 = [1, 2];
// Object.defineProperty(arr3, Symbol.isConcatSpreadable, {
//     enumerable: false,
//     value: false
// })
// const arr1 = new MyArray(1,2);
// console.log(arr1);
// const arr2 = [3, 4].concat(arr1);
// console.log(arr2);
//
//
// Symbol.species 指向一个构造函数, 创造衍生对象的时候,会使用该属相
// class MyArray extends Array {
//     constructor(...argue) {
//         super(...argue);
//     }
//
//     static index.js [Symbol.species]() {
//         return Object;
//     }
// }
// const arr1 = new MyArray(1, 2, 3);
// // 一个对象的衍生对象和该对象为一个类型
// const arr2 = arr1.map(item => item)
// console.log(arr2 instanceof MyArray);
//
// Symbol.match 指向一个函数, 指向一 regexp的一个函数,当执行str.match时,该函数存在,会调用他,返回该方法的返回值;
// String.prototype.match(regexp);
// class MyMatcher extends RegExp{
//     constructor(...arg) {
//         super()
//     }
//     [Symbol.match]() {
//         return '12'
//     }
// }
// const str = '1,2,3,4';
// console.log(str.match(new MyMatcher()));
//
//
