// 用[]可以解析实现了遍历器对象的对象
// const o = {
//   array: {
//     0: 0,
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//   },
//   length: 5,
//   [Symbol.iterator]() {
//     const that = this;
//     let i = 0;
//     return {
//       next() {
//         // eslint-disable-next-line no-plusplus
//         console.log(that.array[i]);
//         return {
//           done: i > that.length,
//           // eslint-disable-next-line no-plusplus,no-const-assign
//           value: that.array[i++],
//         };
//       },
//     };
//   }
//   ,
// };
// const [one, teo, three, four, five] = o;
// console.log(one, teo, three, four, five);

// const node = {
//   loc: {
//     start: {
//       line: 1,
//       column: 5,
//     },
//   },
// };

// const { loc, loc: { start }, loc: { start: { line } } } = node;
// console.log(loc);
// console.log(start);
// console.log(line);

// const o1 = {};
// const obj = { a: 12 };
//
// ({ a: o1.w } = obj);
//
// console.log(o1);
// console.log(o1);

// const arr = [1, 2, 3, 4, 5, 6];
// const { 0: first, [arr.length - 1]: last } = arr;
// console.log(first, last); // 1 , 6

// const a = {
//   b: {
//     c: 1,
//   },
// };
// const a1 = {};
// let b1;
// let c1;
// ({ b: a1.b } = a);
// // eslint-disable-next-line prefer-const
// ({ b: b1, b: { c: c1 } } = a);
// console.log(a1);
// console.log(b1);
// console.log(c1);
