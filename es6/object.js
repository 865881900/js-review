// const a = {
//   index.js name() {
//     return 'wcp';
//   },
// };
// console.log(a.name);

// const b = {
//   [Symbol('sy')]: '本身symbol属性',
//   nameB: '本身可枚举属性',
// };
// b.constructor.prototype.nameA = '原型可枚举属性';
// b.constructor.prototype[Symbol('syP')] = '原型symbol属性';
// Object.defineProperty(b.constructor.prototype, 'notMA', {
//   value: '原型不可枚举属性',
// });
// Object.defineProperty(b, 'notMb', {
//   value: '本身不可枚举属性',
// });

// for in
// eslint-disable-next-line guard-for-in,no-restricted-syntax
// for (const bKey in b) { // 只打印 本身/原型可枚举属性
//   console.log(bKey);
// }

// keys  返回本身可枚举属性
// Object.keys(b).forEach((bKey) => {
//   console.log(bKey); //
// });

// Object.getOwnPropertyNames 返回对象的除了symbol的所有属性
// Object.getOwnPropertyNames(b).forEach((bKey) => {
//   console.log(bKey);
// });

// Object.getOwnPropertySymbols 返回该对象的symbol属性
// Object.getOwnPropertySymbols(b).forEach((bKey) => {
//   console.log(bKey);
// });

// Reflect.ownKeys 返回对象本身的所有的属性
// Reflect.ownKeys(b).forEach((bKey) => {
//   console.log(bKey);
// });

const obj = {
  name: '这是name属性',
  getName() {
    return super.name;
  },
  // getNames: function () {
  //   return super.name
  // }
};
console.log(obj.getName());

const mix = function (object) {
  // eslint-disable-next-line max-len
  return {
    // eslint-disable-next-line max-len
    with: (...mixins) => mixins.reduce((c, mixin) => Object.create(c, Object.getOwnPropertyDescriptors(mixin)), object),
  };
};

const a = { a: 'a' };
const b = { b: 'b' };
const c = { c: 'c' };
const d = mix(c).with(a, b);

console.log(d.a);
